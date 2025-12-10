import { create } from 'zustand';

interface EditorState {
  markdownText: string;
  setMarkdownText: (text: string) => void;
  filePath: string | null;
  setFilePath: (path: string | null) => void;
  isSaved: boolean;
  setSaved: (saved: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  markdownText: '# Hello, MarkFlow!',
  setMarkdownText: (text) => set({ markdownText: text, isSaved: false }),
  filePath: null,
  setFilePath: (path) => set({ filePath: path }),
  isSaved: true,
  setSaved: (saved) => set({ isSaved: saved }),
}));
