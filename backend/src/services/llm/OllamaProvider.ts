import axios from 'axios';
import { LLMProvider } from './LLMProvider.js';
import { PromptFactory } from './PromptFactory.js';

export class OllamaProvider implements LLMProvider {
    private baseUrl: string;

    constructor(baseUrl: string = 'http://localhost:11434') {
        this.baseUrl = baseUrl;
    }

    async isAvailable(): Promise<boolean> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/tags`, {
                timeout: 2000
            });
            return response.status === 200;
        } catch {
            return false;
        }
    }

    async generateConcepts(input: string, format?: 'mindmap' | 'flowchart'): Promise<string> {
        const prompt = PromptFactory.getMindmapPrompt(input, format) + "\nOnly output JSON and nothing else.";

        const response = await axios.post(`${this.baseUrl}/api/generate`, {
            model: 'llama3', // Adjust to a reasonably common generic model
            prompt,
            stream: false,
            format: 'json'
        });

        return response.data.response;
    }
}
