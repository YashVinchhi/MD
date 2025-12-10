"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const Settings = () => {
  const { toast } = useToast();
  const [llmProvider, setLlmProvider] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedProvider = localStorage.getItem('llmProvider') || 'gemini';
    const savedApiKey = localStorage.getItem('apiKey') || '';
    setLlmProvider(savedProvider);
    setApiKey(savedApiKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem('llmProvider', llmProvider);
    localStorage.setItem('apiKey', apiKey);
    toast({
      title: "Settings Saved",
      description: "Your LLM settings have been updated.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
       <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">LLM Configuration</h2>
              <p className="text-muted-foreground">
                Choose and configure your preferred Large Language Model for AI features.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="llm-provider">LLM Provider</Label>
                <Select value={llmProvider} onValueChange={setLlmProvider}>
                  <SelectTrigger id="llm-provider">
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Google Gemini</SelectItem>
                    <SelectItem value="ollama">Ollama</SelectItem>
                    <SelectItem value="qwen">Qwen-2: 0.5B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
              </div>
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
        </div>
      </main>
    </div>
  );
};
