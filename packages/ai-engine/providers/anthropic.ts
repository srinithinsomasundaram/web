import type { AiCompletion, AiPrompt, AiProvider } from "./gemini.js";

export class AnthropicProvider implements AiProvider {
  name = "anthropic";

  async generateFix(prompt: AiPrompt): Promise<AiCompletion> {
    void prompt;
    return {
      text: "",
      provider: this.name
    };
  }
}

