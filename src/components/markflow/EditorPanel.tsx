"use client";

import { useEditorStore } from "@/store/editorStore";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import { forwardRef, useEffect, useState } from "react";

interface EditorPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditorScroll?: (event: any) => void;
}

export const EditorPanel = forwardRef<HTMLDivElement, EditorPanelProps>(({ onEditorScroll }, ref) => {
  const { markdownText, setMarkdownText } = useEditorStore();
  const [content, setContent] = useState(markdownText);
  const [suggestion, setSuggestion] = useState('');

  const fetchPrediction = async (currentContent: string) => {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: currentContent }),
      });
      const data = await response.json();
      setSuggestion(data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    fetchPrediction(newContent);
  };

  const applySuggestion = () => {
    setContent((prevContent) => `${prevContent}${suggestion}`);
    setSuggestion('');
  };

  useEffect(() => {
    setMarkdownText(content);
  }, [content, setMarkdownText]);

  return (
    <div className="relative h-full overflow-auto font-code" ref={ref} onScroll={onEditorScroll}>
      <CodeMirror
        value={content}
        height="100%"
        theme={oneDark}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        onChange={handleContentChange}
        style={{ height: '100%' }}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          autocompletion: true,
          closeBrackets: true,
        }}
      />
      {suggestion && (
        <div className="suggestion-box">
          <p>{suggestion}</p>
          <button onClick={applySuggestion}>Apply Suggestion</button>
        </div>
      )}
    </div>
  );
});

EditorPanel.displayName = "EditorPanel";
