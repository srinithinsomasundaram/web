declare module "vscode" {
  export interface Disposable {
    dispose(): void;
  }

  export interface ExtensionContext {
    subscriptions: Disposable[];
    globalState: Memento;
  }

  export interface Memento {
    get<T>(key: string, defaultValue?: T): T;
    update(key: string, value: unknown): Promise<void>;
  }

  export interface TextDocument {
    getText(): string;
    save(): Promise<boolean>;
    uri: { fsPath: string; toString(): string };
  }

  export interface TextEditor {
    document: TextDocument;
  }

  export interface Uri {
    fsPath: string;
    toString(): string;
  }

  export interface CodeActionContext {
    diagnostics: Diagnostic[];
  }

  export interface Command {
    command: string;
    title: string;
    arguments?: unknown[];
  }

  export interface CodeAction {
    title: string;
    kind?: CodeActionKind;
    command?: Command;
    edit?: WorkspaceEdit;
  }

  export interface CodeActionKind {
    value: string;
  }

  export interface CodeActionProvider<T = CodeAction> {
    provideCodeActions(
      document: TextDocument,
      range: Range,
      context: CodeActionContext,
      token: unknown
    ): T[] | Promise<T[]>;
  }

  export class WorkspaceEdit {
    replace(uri: { toString(): string }, range: Range, newText: string): void;
  }

  export interface Location {
    uri: { toString(): string };
    range: Range;
  }

  export interface DiagnosticCollection extends Disposable {}
  export interface DiagnosticCollection {
    set(uri: { toString(): string }, diagnostics: Diagnostic[]): void;
    clear(): void;
  }

  export interface Webview {
    html: string;
    options: { enableScripts: boolean; enableCommandUris?: boolean };
  }

  export interface WebviewView {
    webview: Webview;
    onDidDispose?(listener: () => void): Disposable;
  }

  export interface WebviewViewProvider {
    resolveWebviewView(view: WebviewView): void;
  }

  export interface Terminal {
    show(preserveFocus?: boolean): void;
    sendText(value: string, addNewLine?: boolean): void;
    dispose(): void;
  }

  export class Position {
    constructor(line: number, character: number);
  }

  export class Range {
    constructor(start: Position, end: Position);
  }

  export interface Diagnostic {
    range: Range;
    message: string;
    severity: DiagnosticSeverity;
    source?: string;
  }

  export enum DiagnosticSeverity {
    Error = 0,
    Warning = 1,
    Information = 2,
    Hint = 3
  }

  export const commands: {
    registerCommand(name: string, callback: (...args: unknown[]) => Promise<void> | void): Disposable;
  };

  export const workspace: {
    workspaceFolders?: Array<{ uri: Uri }>;
    onDidSaveTextDocument(callback: (document: TextDocument) => void): Disposable;
    registerCodeActionsProvider(
      selector: unknown,
      provider: CodeActionProvider,
      metadata?: unknown
    ): Disposable;
    applyEdit(edit: WorkspaceEdit): Promise<boolean>;
    openTextDocument(uri: { toString(): string }): Promise<TextDocument>;
  };

  export const languages: {
    createDiagnosticCollection(name: string): DiagnosticCollection;
    registerCodeActionsProvider(
      selector: unknown,
      provider: CodeActionProvider,
      metadata?: unknown
    ): Disposable;
  };

  export const window: {
    activeTextEditor?: TextEditor;
    showWarningMessage(message: string): void;
    showInformationMessage(message: string): void;
    showInputBox(options?: { prompt?: string; placeHolder?: string; value?: string; ignoreFocusOut?: boolean }): Promise<string | undefined>;
    createTerminal(name: string): Terminal;
    registerWebviewViewProvider(viewId: string, provider: WebviewViewProvider): Disposable;
    showTextDocument(document: TextDocument, options?: { selection?: Range; preview?: boolean; preserveFocus?: boolean }): Promise<TextEditor>;
  };

  export const CodeActionKind: {
    QuickFix: CodeActionKind;
  };

  export const Uri: {
    file(path: string): Uri;
  };
}
