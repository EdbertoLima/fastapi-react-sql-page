// src/config/index.ts (TEMPLATE)

export const BASE_URL: string =
  import.meta.env.VITE_BASE_URL ?? 'https://localhost:{{ cookiecutter.https_port }}';

export const BACKEND_URL: string =
  import.meta.env.VITE_BACKEND_URL ??
  'https://localhost:{{ cookiecutter.https_port }}/api/v1';
