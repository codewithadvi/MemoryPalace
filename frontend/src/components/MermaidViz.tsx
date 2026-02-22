import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { MindmapData } from './MarkmapViz';

export interface MermaidVizProps {
    data: MindmapData | null;
}

export default function MermaidViz({ data }: MermaidVizProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!data || !containerRef.current) return;

        // Initialize mermaid globally
        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
                primaryColor: '#e0e7ff',   // indigo-100
                primaryTextColor: '#312e81', // indigo-900
                primaryBorderColor: '#818cf8', // indigo-400
                lineColor: '#6366f1', // indigo-500
                secondaryColor: '#f1f5f9',
                tertiaryColor: '#fff',
            },
            flowchart: {
                htmlLabels: true,
                curve: 'basis'
            }
        });

        const generateMermaidCode = () => {
            let md = 'graph TD\n';
            let idCounter = 0;

            const traverse = (node: MindmapData, parentId: string | null = null) => {
                if (!node || !node.topic) return;

                const safeId = `node_${idCounter++}`;

                // Sanitize text for mermaid by keeping it safely wrapped within double quotes.
                // Replace internal double quotes so they don't break the container string.
                const safeTopic = node.topic.replace(/"/g, "&quot;").replace(/\n/g, "<br/>");

                // if it's the root node, make it round ( ), else rectangular [ ]
                const labelShape = parentId === null ? `("${safeTopic}")` : `["${safeTopic}"]`;

                md += `    ${safeId}${labelShape}\n`;

                if (parentId) {
                    md += `    ${parentId} --> ${safeId}\n`;
                }

                if (node.children && node.children.length > 0) {
                    for (const child of node.children) {
                        traverse(child, safeId);
                    }
                }
            };

            traverse(data);
            return md;
        };

        const renderChart = async () => {
            const chartDef = generateMermaidCode();
            try {
                containerRef.current!.innerHTML = '';
                const { svg } = await mermaid.render(`mermaid-svg-${Date.now()}`, chartDef);
                containerRef.current!.innerHTML = svg;
            } catch (error) {
                console.error("Mermaid Render Error", error);
            }
        };

        renderChart();

    }, [data]);

    if (!data) return null;

    // Use interactive-pan-zoom pattern wrapping the SVG container
    return (
        <div className="w-full h-full bg-white rounded-3xl overflow-hidden flex items-center justify-center p-0">
            <TransformWrapper
                initialScale={1}
                minScale={0.1}
                maxScale={8}
                centerOnInit={true}
                wheel={{ step: 0.1 }}
            >
                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                    <div ref={containerRef} className="mermaid-container cursor-grab active:cursor-grabbing w-full h-full flex items-center justify-center"></div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}
