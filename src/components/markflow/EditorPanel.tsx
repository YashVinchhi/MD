"use client";

import { useEditorStore } from "@/store/editorStore";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import { forwardRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { predict } from "@/ai/llm";
import { EditorView } from "codemirror";

interface EditorPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditorScroll?: (event: any) => void;
}

export const EditorPanel = forwardRef<HTMLDivElement, EditorPanelProps>(({ onEditorScroll }, ref) => {
  const { markdownText, setMarkdownText } = useEditorStore();
  const [content, setContent] = useState(markdownText);
  const [suggestion, setSuggestion] = useState('');

  const fetchPrediction = async (currentContent: string) => {
    if (currentContent.trim().length === 0) {
      setSuggestion('');
      return;
    }
    try {
      const prediction = await predict(currentContent);
      if(prediction){
        setSuggestion(prediction);
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    const lastChar = newContent.slice(-1);
    // Fetch prediction when user pauses typing or enters a space/newline
    if (/\s|\n/.test(lastChar) || newContent.length === 0) {
      fetchPrediction(newContent);
    }
  };

  const applySuggestion = () => {
    const newContent = `${content}${suggestion}`;
    setContent(newContent);
    setMarkdownText(newContent);
    setSuggestion('');
  };

  useEffect(() => {
    const handler = setTimeout(() => {
        setMarkdownText(content);
        fetchPrediction(content);
    }, 500);
    return () => clearTimeout(handler);
  }, [content, setMarkdownText]);

  useEffect(() => {
    setContent(markdownText);
  }, [markdownText]);

  return (
    <div className="relative h-full overflow-auto font-code break-words max-w-3xl mx-auto w-full" ref={ref} onScroll={onEditorScroll}>
      <CodeMirror
        value={content}
        height="100%"
        theme={oneDark}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          EditorView.lineWrapping,
        ]}
        onChange={handleContentChange}
        style={{ height: '100%', width: '100%' }}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          autocompletion: true,
          closeBrackets: true,
        }}
      />
      {suggestion && (
        <div className="absolute bottom-4 right-4 z-10 rounded-md border border-input bg-background p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Suggestion:</span> {suggestion}
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setSuggestion('')}>Ignore</Button>
            <Button size="sm" onClick={applySuggestion}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
});

EditorPanel.displayName = "EditorPanel";
