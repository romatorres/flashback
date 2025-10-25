'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    taos: {
      init: () => void;
    };
  }
}

export function useTaos() {
  useEffect(() => {
    const initTaos = async () => {
      await import('taos');
      if (window.taos) {
        window.taos.init();
      }
    };

    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      initTaos();
    }
  }, []);
}