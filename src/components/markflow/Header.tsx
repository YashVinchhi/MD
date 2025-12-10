"use client";

import {
  File,
  FilePlus,
  FolderOpen,
  Save,
  SaveAll,
  Settings,
} from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsTauri } from "@/hooks/useIsTauri";
import { AppLogo } from "./AppLogo";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from 'next/link';

export function Header() {
  const isTauri = useIsTauri();
  const { toast } = useToast();
  const {
    markdownText,
    setMarkdownText,
    filePath,
    setFilePath,
    isSaved,
    setSaved,
  } = useEditorStore();
  const [tauriApi, setTauriApi] = useState<any>(null);

  useEffect(() => {
    if (isTauri) {
      import("@tauri-apps/api").then((api) => {
        setTauriApi(api);
      });
    }
  }, [isTauri]);

  const handleNewFile = () => {
    setMarkdownText("");
    setFilePath(null);
    setSaved(true);
  };

  const handleOpenFile = async () => {
    if (!tauriApi) return;
    try {
      const selected = await tauriApi.dialog.open({
        multiple: false,
        filters: [{ name: "Markdown", extensions: ["md", "mdx"] }],
      });
      if (typeof selected === "string") {
        const text = await tauriApi.fs.readTextFile(selected);
        setMarkdownText(text);
        setFilePath(selected);
        setSaved(true);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error opening file",
        description: "Could not read the selected file.",
        variant: "destructive",
      });
    }
  };

  const handleSaveFile = async () => {
    if (!tauriApi) return;
    if (!filePath) {
      await handleSaveFileAs();
      return;
    }
    try {
      await tauriApi.fs.writeTextFile(filePath, markdownText);
      setSaved(true);
      toast({
        title: "File Saved",
        description: `Saved to ${filePath.split(/[\\/]/).pop()}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error saving file",
        description: "Could not save the file.",
        variant: "destructive",
      });
    }
  };

  const handleSaveFileAs = async () => {
    if (!tauriApi) return;
    try {
      const newPath = await tauriApi.dialog.save({
        filters: [{ name: "Markdown", extensions: ["md", "mdx"] }],
        defaultPath: filePath || undefined,
      });
      if (newPath) {
        await tauriApi.fs.writeTextFile(newPath, markdownText);
        setFilePath(newPath);
        setSaved(true);
        toast({
          title: "File Saved",
          description: `Saved to ${newPath.split(/[\\/]/).pop()}`,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error saving file",
        description: "Could not save the file.",
        variant: "destructive",
      });
    }
  };

  const fileActions = [
    {
      label: "New File",
      icon: FilePlus,
      action: handleNewFile,
      shortcut: "Ctrl+N",
    },
    {
      label: "Open File",
      icon: FolderOpen,
      action: handleOpenFile,
      shortcut: "Ctrl+O",
    },
    {
      label: "Save",
      icon: Save,
      action: handleSaveFile,
      shortcut: "Ctrl+S",
    },
    {
      label: "Save As...",
      icon: SaveAll,
      action: handleSaveFileAs,
      shortcut: "Ctrl+Shift+S",
    },
  ];

  return (
    <div className="flex h-full flex-col gap-4 p-2">
      <div className="p-2">
        <AppLogo />
      </div>
      <div className="flex flex-col gap-2 px-2">
        <TooltipProvider>
          {fileActions.map(({ label, icon: Icon, action, shortcut }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2"
                  onClick={action}
                  disabled={!isTauri}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate group-data-[collapsible=icon]:hidden">
                    {label}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                className="group-data-[collapsible=icon]:flex hidden"
              >
                <p>
                  {label} ({shortcut})
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>

        {!isTauri && (
          <div className="mt-4 rounded-md border border-dashed border-destructive/50 bg-destructive/10 p-3 text-center text-xs text-destructive-foreground/80 group-data-[collapsible=icon]:hidden">
            File operations are disabled in the browser. Please run in Tauri for
            full functionality.
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2 p-2">
        <TooltipProvider>
           <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2"
                    aria-label="Settings"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      Settings
                    </span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                className="group-data-[collapsible=icon]:flex hidden"
              >
                <p>
                  Settings
                </p>
              </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-2 rounded-md p-2 text-xs text-muted-foreground">
          <File className="h-4 w-4 flex-shrink-0" />
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span
              className={cn(
                "truncate transition-colors",
                !isSaved && "text-accent-foreground"
              )}
            >
              {filePath ? filePath.split(/[\\/]/).pop() : "Untitled"}{" "}
              {!isSaved && "*"}
            </span>
            <span className="truncate text-xs opacity-70">
              {filePath ? filePath : "No file open"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
