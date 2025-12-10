"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from "../ui/sidebar";
import { Header } from "./Header";
import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { useToast } from "@/hooks/use-toast";
import { useIsTauri } from "@/hooks/useIsTauri";

export default function MarkFlowClient() {
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isEditorScrolling = useRef(false);
  const isPreviewScrolling = useRef(false);
  const { setMarkdownText, setFilePath, setSaved } = useEditorStore();
  const { toast } = useToast();
  const isTauri = useIsTauri();
  const [tauriApi, setTauriApi] = useState<any>(null);

  useEffect(() => {
    if (isTauri) {
      import("@tauri-apps/api").then((api) => {
        setTauriApi(api);
      });
    }
  }, [isTauri]);

  useEffect(() => {
    if (!tauriApi) return;
    const unlisten = tauriApi.event.listen(
      "tauri://file-drop",
      async (e: { payload: string[] }) => {
        const filePath = e.payload[0];
        if (filePath && (filePath.endsWith(".md") || filePath.endsWith(".mdx"))) {
          try {
            const text = await tauriApi.fs.readTextFile(filePath);
            setMarkdownText(text);
            setFilePath(filePath);
            setSaved(true);
            toast({
              title: "File Loaded",
              description: `Opened ${filePath.split(/[\\/]/).pop()}`,
            });
          } catch (error) {
            console.error(error);
            toast({
              title: "Error opening file",
              description: "Could not read the dropped file.",
              variant: "destructive",
            });
          }
        }
      }
    );
    return () => {
      unlisten.then((f: () => void) => f());
    };
  }, [tauriApi, setMarkdownText, setFilePath, setSaved, toast]);

  const handleEditorScroll = () => {
    if (!editorRef.current || !previewRef.current || isPreviewScrolling.current) return;
  
    isEditorScrolling.current = true;
    const { scrollTop, scrollHeight, clientHeight } = editorRef.current;
    if (scrollHeight > clientHeight) {
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      previewRef.current.scrollTop = scrollPercentage * (previewRef.current.scrollHeight - previewRef.current.clientHeight);
    }
    setTimeout(() => { isEditorScrolling.current = false; }, 100);
  };
  
  const handlePreviewScroll = () => {
    if (!editorRef.current || !previewRef.current || isEditorScrolling.current) return;
  
    isPreviewScrolling.current = true;
    const { scrollTop, scrollHeight, clientHeight } = previewRef.current;
    if (scrollHeight > clientHeight) {
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      editorRef.current.scrollTop = scrollPercentage * (editorRef.current.scrollHeight - editorRef.current.clientHeight);
    }
    setTimeout(() => { isPreviewScrolling.current = false; }, 100);
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <Header />
      </Sidebar>
      <SidebarInset>
        <div className="h-screen">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={20}>
              <EditorPanel ref={editorRef} onEditorScroll={handleEditorScroll} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={20}>
              <PreviewPanel ref={previewRef} onPreviewScroll={handlePreviewScroll} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
