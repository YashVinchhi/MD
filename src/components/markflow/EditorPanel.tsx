"use client";

import { useEditorStore } from "@/store/editorStore";
import CodeMirror, { type EditorView } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import { forwardRef } from "react";

interface EditorPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditorScroll?: (event: any) => void;
}

export const EditorPanel = forwardRef<HTMLDivElement, EditorPanelProps>(({ onEditorScroll }, ref) => {
  const { markdownText, setMarkdownText } = useEditorStore();

  const handleEditorChange = (value: string) => {
    setMarkdownText(value);
  };
  
  return (
    <div className="relative h-full overflow-auto font-code" ref={ref} onScroll={onEditorScroll}>
      <CodeMirror
        value={markdownText}
        height="100%"
        theme={oneDark}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        onChange={handleEditorChange}
        style={{ height: '100%' }}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          autocompletion: true,
          closeBrackets: true,
        }}
      />
    </div>
  );
});

EditorPanel.displayName = "EditorPanel";
