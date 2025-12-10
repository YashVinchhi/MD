import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Settings from '../components/Settings';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const metadata: Metadata = {
  title: 'MarkFlow',
  description: 'A modern markdown editor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
