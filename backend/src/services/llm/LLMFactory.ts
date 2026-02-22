import { LLMProvider } from './LLMProvider.js';
import { GroqProvider } from './GroqProvider.js';
import { GeminiProvider } from './GeminiProvider.js';
import { OllamaProvider } from './OllamaProvider.js';

export class LLMFactory {
    /**
     * Automatically select the best provider based on availability.
     * Order of preference for cloud mode: Groq -> Gemini. Local falls back to Ollama.
     * @param forceLocal If true, attempts to force Ollama local provider.
     */
    static async getBestProvider(forceLocal: boolean = false): Promise<LLMProvider> {
        if (forceLocal) {
            const ollama = new OllamaProvider();
            if (await ollama.isAvailable()) return ollama;
            throw new Error('Local Ollama provider is not available.');
        }

        const groq = new GroqProvider();
        if (await groq.isAvailable()) return groq;

        const gemini = new GeminiProvider();
        if (await gemini.isAvailable()) return gemini;

        throw new Error('No cloud LLM providers are available. Check API keys.');
    }
}
