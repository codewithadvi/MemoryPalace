export interface LLMProvider {
    /**
     * Checks if the LLM provider is available and credentials are valid.
     */
    isAvailable(): Promise<boolean>;

    /**
     * Generates concepts from the provided input string.
     * @param input Formatting string of the input text/topic
     * @returns A string representation of the generated mindmap concepts or JSON
     */
    generateConcepts(input: string, format?: 'mindmap' | 'flowchart'): Promise<string>;
}
