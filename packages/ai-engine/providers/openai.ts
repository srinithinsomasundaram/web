import type { AiCompletion, AiPrompt, AiProvider } from "./gemini.js";

export class OpenAIProvider implements AiProvider {
  name = "openai";

  async generateFix(prompt: AiPrompt): Promise<AiCompletion> {
    void prompt;
    return {
      text: "",
      provider: this.name
    };
  }
}

