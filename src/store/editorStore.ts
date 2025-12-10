import { create } from 'zustand';

interface EditorState {
  markdownText: string;
  filePath: string | null;
  isSaved: boolean;
  editorSettings: {
    // a place for future settings
  };
  setMarkdownText: (text: string) => void;
  setFilePath: (path: string | null) => void;
  setSaved: (isSaved: boolean) => void;
}

const initialText = `# Welcome to MarkFlow!

This is a simple markdown editor with a live preview.

## Features

- **Dual-pane layout**: Code on the left, preview on the right.
- **Live Preview**: Updates as you type.
- **GitHub Flavored Markdown**: Including tables, code blocks, and more.
- **LaTeX Math Equations**:
  - Inline: $E=mc^2$
  - Block: $$ \int_a^b f(x) dx = F(b) - F(a) $$
- **Mermaid Diagrams**:
  \`\`\`mermaid
  graph TD;
      A[Start] --> B{Is it?};
      B -- Yes --> C[OK];
      C --> D[End];
      B -- No --> E[Find out];
      E --> B;
  \`\`\`
- **AI-Generated Mermaid Diagrams**:
  Use a \`mermaid-gen\` code block with a description to generate a diagram.
  \`\`\`mermaid-gen
  A sequence diagram for a user logging into a web application. The user provides credentials, the server validates them and returns a session token.
  \`\`\`

## File Operations

Use the buttons in the sidebar to create, open, and save files. You can also drag and drop a markdown file onto the window.

*This application is best experienced when run within a Tauri container to enable file system access.*
`;

export const useEditorStore = create<EditorState>((set, get) => ({
  markdownText: initialText,
  filePath: null,
  isSaved: true,
  editorSettings: {},
  setMarkdownText: (text: string) => set({ markdownText: text, isSaved: get().filePath ? false : true }),
  setFilePath: (path: string | null) => set({ filePath: path }),
  setSaved: (isSaved: boolean) => set({ isSaved }),
}));
