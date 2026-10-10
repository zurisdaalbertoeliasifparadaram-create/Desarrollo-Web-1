// src/hooks/usePageNotFound.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Registra en consola la URL que no se encontró (ruta "*" del router).
// Devuelve esa misma URL para poder mostrarla en la página 404.
export function usePageNotFound(): string {
  const { pathname, search } = useLocation();
  const attemptedUrl = `${pathname}${search}`;

  useEffect(() => {
    console.warn(`[404] Ruta no encontrada: ${attemptedUrl}`);
  }, [attemptedUrl]);

  return attemptedUrl;
}
