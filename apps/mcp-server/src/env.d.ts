declare const process: {
  env: Record<string, string | undefined>;
  argv: string[];
  exit(code?: number): never;
  stdin: {
    setEncoding(encoding: "utf8"): void;
    on(event: "data", listener: (chunk: string) => void): void;
    on(event: "end", listener: () => void): void;
  };
  stdout: {
    write(chunk: string): void;
  };
};
