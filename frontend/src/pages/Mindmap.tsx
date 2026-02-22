import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, Loader2, Server, Upload, Download, FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkmapViz, { type MindmapData } from '../components/MarkmapViz';
import MermaidViz from '../components/MermaidViz';

export default function Mindmap() {
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<MindmapData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [forceLocal, setForceLocal] = useState(false);
    const [format, setFormat] = useState<'mindmap' | 'flowchart'>('mindmap');
    const [file, setFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/mindmaps/generate`;

    const handleGenerate = async () => {
        if (!topic.trim() && !file) return;
        setLoading(true);
        setError(null);
        setData(null);

        try {
            let response;

            if (file) {
                // If a file is selected, use FormData (multipart/form-data)
                const formData = new FormData();
                formData.append('file', file);
                formData.append('forceLocal', forceLocal.toString());
                formData.append('format', format);

                response = await axios.post(API_URL, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Determine if input is a URL
                const isUrl = topic.trim().toLowerCase().startsWith('http');

                response = await axios.post(API_URL, {
                    input: topic,
                    type: isUrl ? 'url' : 'text',
                    forceLocal: forceLocal,
                    format: format
                });
            }

            const mindmapData = response?.data?.data;
            if (mindmapData) {
                setData(mindmapData);
            } else {
                throw new Error('Did not receive valid JSON structure from the AI.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'An error occurred during generation. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleExportSVG = () => {
        // Simple SVG export by hunting for the generated markmap SVG
        const svgElement = document.querySelector('.markmap-container svg');
        if (!svgElement) {
            alert("No diagram rendered to export.");
            return;
        }

        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgElement);

        // Add namespaces
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }

        // Add XML declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        // Convert svg source to URI data scheme
        const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

        // Force download
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `${format}_export.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="min-h-screen bg-slate-50 relative font-sans">
            <nav className="absolute top-0 w-full p-4 flex justify-between items-center z-10">
                <button
                    onClick={() => navigate('/')}
                    className="p-3 bg-white hover:bg-slate-100 rounded-full shadow-sm text-slate-600 transition-colors"
                >
                    <Home size={20} />
                </button>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setForceLocal(!forceLocal)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors text-sm shadow-sm ${forceLocal ? 'bg-indigo-100 text-indigo-700 outline outline-1 outline-indigo-300' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                        title="Toggle Local Ollama vs Cloud APIs"
                    >
                        <Server size={16} />
                        {forceLocal ? 'Local Mode' : 'Cloud Mode'}
                    </button>
                    <div className="text-lg font-semibold text-slate-800 tracking-tight">Memory Palace</div>
                </div>
            </nav>

            <div className="pt-24 px-6 max-w-6xl mx-auto flex flex-col h-screen pb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 outline outline-1 outline-slate-100 mb-6 shrink-0"
                >
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-3xl font-bold text-slate-800">Create New {format === 'mindmap' ? 'Mindmap' : 'Flowchart'}</h2>

                        <div className="flex bg-slate-100 rounded-lg p-1 shadow-inner">
                            <button
                                onClick={() => setFormat('mindmap')}
                                className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${format === 'mindmap' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Mindmap
                            </button>
                            <button
                                onClick={() => setFormat('flowchart')}
                                className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${format === 'flowchart' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Flowchart
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* File Upload / Input Box */}
                        <div className="flex gap-4 items-center">
                            {file ? (
                                <div className="flex-1 flex items-center justify-between px-6 py-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-indigo-500" />
                                        <span className="font-medium text-indigo-900 truncate">{file.name}</span>
                                        <span className="text-indigo-400 text-sm">({(file.size / 1024).toFixed(1)} KB)</span>
                                    </div>
                                    <button onClick={() => setFile(null)} className="text-indigo-400 hover:text-indigo-700 p-1">
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
                                    disabled={loading}
                                    placeholder="Enter a topic, paste a URL, or type raw text..."
                                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-lg disabled:opacity-50"
                                />
                            )}

                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            />

                            {!file && (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl border border-slate-200 transition-colors shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 flex items-center gap-2"
                                    title="Upload PDF, DOCX, or PPT"
                                >
                                    <Upload size={24} />
                                </button>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={loading || (!topic.trim() && !file)}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md cursor-pointer transition-colors text-lg flex items-center gap-2 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : null}
                                {loading ? 'Thinking...' : 'Generate'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}
                </motion.div>

                {/* Mindmap Viz Container */}
                <div className="flex-1 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col relative bg-slate-50 overflow-hidden shadow-inner w-full min-h-0 bg-dot-pattern">

                    {/* Header bar inside visualization area */}
                    {data && (
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <button
                                onClick={handleExportSVG}
                                className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all font-medium text-sm"
                            >
                                <Download size={16} />
                                Export SVG
                            </button>
                        </div>
                    )}

                    {loading && !data && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm z-10">
                            <Loader2 size={48} className="text-indigo-500 animate-spin mb-4" />
                            <p className="text-lg font-medium text-slate-700">Brewing your Memory Palace...</p>
                            <p className="text-sm text-slate-500 mt-2">Extracting deeply nested concepts</p>
                        </div>
                    )}

                    <div className="flex-1 w-full h-full markmap-container">
                        {format === 'flowchart' ? (
                            <MermaidViz data={data} />
                        ) : (
                            <MarkmapViz data={data} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
