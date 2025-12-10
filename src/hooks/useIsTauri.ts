"use client"

import { useState, useEffect } from 'react';

export function useIsTauri() {
  const [isTauri, setIsTauri] = useState(false);
  useEffect(() => {
    setIsTauri(typeof window !== 'undefined' && !!(window as any).__TAURI__);
  }, []);
  return isTauri;
}
