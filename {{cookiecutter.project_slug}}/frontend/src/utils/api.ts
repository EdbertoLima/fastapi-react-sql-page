import { BACKEND_URL } from '../config';

type BackendMessageResponse = {
  message?: string;
  [key: string]: unknown;
};

/**
 * Fetch a simple message from the backend.
 * @returns The `message` string from the backend.
 * @throws Error if response is not ok or message is missing.
 */
export const getMessage = async (): Promise<string> => {
  const response = await fetch(BACKEND_URL);

  if (!response.ok) {
    // include status text for better debugging
    throw new Error(
      `Failed to get message from backend (${response.status} ${response.statusText})`,
    );
  }

  const data = (await response.json()) as BackendMessageResponse;

  if (typeof data.message === 'string') {
    return data.message;
  }

  throw new Error('Failed to get message from backend: no "message" field');
};
