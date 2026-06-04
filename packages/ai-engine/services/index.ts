import type { AiCompletion, AiPrompt, AiProvider } from "../providers/gemini.js";

export class AiService {
  constructor(private readonly provider: AiProvider) {}

  async generateFix(prompt: AiPrompt): Promise<AiCompletion> {
    return this.provider.generateFix(prompt);
  }
}

