# **App Name**: MarkFlow

## Core Features:

- Dual-Pane Interface: Split-screen layout with synchronized scrolling between the editor and preview panes, including a collapsible file explorer sidebar.
- CodeMirror Editor: CodeMirror 6 editor with built-in syntax highlighting within the editor itself and auto-closing brackets/quotes.
- Markdown Preview Engine: React-markdown based preview with custom code block handling for Mermaid diagrams.  The Mermaid diagrams are generated using an LLM tool and API.
- Math Equations: Support for LaTeX math equations using rehype-katex and remark-math within the preview pane.
- Tauri Backend Integration: Rust backend with Tauri commands for file reading/writing (read_file, write_file), opening file dialog (open_file_dialog), and saving file dialog (save_file_dialog).
- Drag and Drop Support: The backend should handle OS-level drag-and-drop of files into the editor window.
- State Management: Zustand store (`useEditorStore`) for managing markdownText, currentFilePath, isSaved, and editorSettings.

## Style Guidelines:

- Primary color: Dark Purple (#4A148C) to bring out a sense of focus, depth, and sophistication suitable for a markdown editor focused on technical writing.
- Background color: Very dark gray (#212121) to provide a high contrast surface ideal for long-form content, to complement a dark UI.
- Accent color: Blue-Violet (#5A35B3), which is analogous to the primary color, adding a cool, contrasting, and modern feel to key interactive elements.
- Body and headline font: 'Inter' sans-serif provides a modern and neutral feel, suitable for both headlines and body text.
- Code font: 'Source Code Pro' monospaced font for displaying code snippets and markdown source within the editor.
- Lucide Icons: Use a consistent style with a focus on clarity and simplicity for a clean UI experience.
- Split-pane layout with responsive design, ensuring usability across various screen sizes.
- Subtle transitions and animations for a smoother user experience when opening/closing the file explorer, switching between documents, and synchronizing scroll.