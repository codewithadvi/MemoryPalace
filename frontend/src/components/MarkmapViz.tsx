import React, { useEffect, useRef } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

export interface MindmapData {
    id: string;
    topic: string;
    children?: MindmapData[];
}

export interface MarkmapVizProps {
    data: MindmapData | null;
}

const transformer = new Transformer();

function jsonToMarkdown(node: MindmapData, depth: number = 1): string {
    if (!node || !node.topic) return '';
    let md = `${'#'.repeat(depth)} ${node.topic}\n`;
    if (node.children && node.children.length > 0) {
        for (const child of node.children) {
            md += jsonToMarkdown(child, depth + 1);
        }
    }
    return md;
}

export default function MarkmapViz({ data }: MarkmapVizProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const markmapRef = useRef<Markmap | null>(null);

    useEffect(() => {
        if (!data || !svgRef.current) return;

        // Convert our custom JSON tree into Markdown, then transform to Markmap INode
        const markdown = jsonToMarkdown(data);
        const { root } = transformer.transform(markdown);

        if (!markmapRef.current) {
            markmapRef.current = Markmap.create(svgRef.current, {
                autoFit: true,
                fitRatio: 0.9,
            }, root);
        } else {
            markmapRef.current.setData(root);
            markmapRef.current.fit();
        }
    }, [data]);

    if (!data) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="font-medium text-lg">Awaiting knowledge spark...</p>
                <p className="text-sm mt-2 max-w-sm text-center">Enter a prompt, URL, or block of text to generate.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white rounded-3xl overflow-hidden interactive-markmap flex items-center justify-center">
            <svg ref={svgRef} className="w-full h-full min-h-[600px]"></svg>
        </div>
    );
}
