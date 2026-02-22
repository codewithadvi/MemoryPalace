export class PromptFactory {
    static getMindmapPrompt(input: string, format: 'mindmap' | 'flowchart' = 'mindmap'): string {
        if (format === 'flowchart') {
            return `Analyze the following content and extract a highly detailed, step-by-step flowchart or process diagram. 
Your response MUST be purely valid JSON representing the flowchart.
The JSON must have a single root object with keys 'id', 'topic', and 'children' (which is an array of child nodes). 
Each node should represent a step, decision, or state in the process. Break down complex steps into smaller, detailed sub-steps.
Do not wrap the JSON in markdown blocks (like \`\`\`json). Just return the raw JSON.
Content: "${input}"`;
        }

        return `Analyze the following content deeply and break it down into a highly detailed, extremely comprehensive hierarchical mindmap structure. 
Extract every key concept, sub-concept, definition, and important detail. Do not be brief; be exhaustive.
Your response MUST be purely valid JSON representing the mindmap.
The JSON must have a single root object with keys 'id', 'topic', and 'children' (which is an array of child nodes). 
Do not wrap the JSON in markdown blocks (like \`\`\`json). Just return the raw JSON object.
Content: "${input}"`;
    }
}
