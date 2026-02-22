import process from 'process';
import { LLMProvider } from './LLMProvider.js';
import Groq from 'groq-sdk';
import { PromptFactory } from './PromptFactory.js';

export class GroqProvider implements LLMProvider {
    private groq: Groq;

    constructor() {
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY || ''
        });
    }

    async isAvailable(): Promise<boolean> {
        try {
            if (!process.env.GROQ_API_KEY) return false;
            // Quick model list request to check token
            await this.groq.models.list();
            return true;
        } catch {
            return false;
        }
    }

    async generateConcepts(input: string, format?: 'mindmap' | 'flowchart'): Promise<string> {
        const prompt = PromptFactory.getMindmapPrompt(input, format);

        const chatCompletion = await this.groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' }
        });

        const content = chatCompletion.choices[0]?.message?.content || '{}';
        // Ensure no markdown block wrapping
        return content.replace(/```json\n?|\n?```/gi, '').trim();
    }
}
