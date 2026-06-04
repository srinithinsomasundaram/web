export interface AiPrompt {
  title: string;
  context: string;
}

export interface AiCompletion {
  text: string;
  provider: string;
}

export interface AiProvider {
  name: string;
  generateFix(prompt: AiPrompt): Promise<AiCompletion>;
}

export class GeminiProvider implements AiProvider {
  name = "gemini";

  async generateFix(prompt: AiPrompt): Promise<AiCompletion> {
    void prompt;
    return {
      text: "",
      provider: this.name
    };
  }
}

