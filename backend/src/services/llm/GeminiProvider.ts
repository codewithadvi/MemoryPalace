import process from 'process';
import { LLMProvider } from './LLMProvider.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PromptFactory } from './PromptFactory.js';

export class GeminiProvider implements LLMProvider {
    private genAI: GoogleGenerativeAI | null = null;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
        }
    }

    async isAvailable(): Promise<boolean> {
        try {
            if (!this.genAI) return false;
            const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            // Validate with a simple tokens counts call or just trust if key exists format
            return true;
        } catch {
            return false;
        }
    }

    async generateConcepts(input: string, format?: 'mindmap' | 'flowchart'): Promise<string> {
        if (!this.genAI) throw new Error("Gemini API not configured");

        const prompt = PromptFactory.getMindmapPrompt(input, format);

        const model = this.genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}
