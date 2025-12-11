// src/config/index.ts (TEMPLATE)

export const BASE_URL: string =
  import.meta.env.VITE_BASE_URL ?? 'http://localhost:{{ cookiecutter.port }}';

export const BACKEND_URL: string =
  import.meta.env.VITE_BACKEND_URL ??
  'http://localhost:{{ cookiecutter.port }}/api/v1';
