import { jwtDecode } from 'jwt-decode';

type TokenPermissions = 'user' | 'admin' | string;

interface TokenPayload {
  permissions?: TokenPermissions;
  exp?: number; // standard JWT exp claim (seconds since epoch)
  [key: string]: unknown;
}

interface AuthResponse {
  access_token: string;
  token_type?: string;
  [key: string]: unknown;
}

const TOKEN_KEY = 'token';
const PERMISSIONS_KEY = 'permissions';

const storeAuthData = (token: string) => {
  const decoded = jwtDecode<TokenPayload>(token);
  if (decoded.permissions) {
    localStorage.setItem(PERMISSIONS_KEY, decoded.permissions);
  }
  localStorage.setItem(TOKEN_KEY, token);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    // Optional: check expiry if present
    if (decoded.exp && typeof decoded.exp === 'number') {
      const expiresAt = decoded.exp * 1000; // exp is in seconds
      if (Date.now() >= expiresAt) {
        // token expired -> clean up and treat as not authenticated
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(PERMISSIONS_KEY);
        return false;
      }
    }

    const permissions = decoded.permissions ?? localStorage.getItem(PERMISSIONS_KEY);
    return permissions === 'user' || permissions === 'admin';
  } catch {
    // invalid token
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PERMISSIONS_KEY);
    return false;
  }
};

/**
 * Login to backend and store JSON web token on success.
 *
 * @param email
 * @param password
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  if (!email || !password) {
    throw new Error('Email or password was not provided');
  }

  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const response = await fetch('/api/token', {
    method: 'POST',
    body: formData,
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Internal server error');
    }
    if (data?.detail) {
      // backend error in FastAPI style
      throw new Error(String(data.detail));
    }
    throw new Error(data ? JSON.stringify(data) : 'Login failed');
  }

  if (data && typeof data.access_token === 'string') {
    storeAuthData(data.access_token);
  }

  return data as AuthResponse;
};

/**
 * Sign up via backend and store JSON web token on success.
 *
 * @throws Error on http errors or failed attempts
 */
export const signUp = async (
  email: string,
  password: string,
  passwordConfirmation: string,
): Promise<AuthResponse> => {
  if (!email) throw new Error('Email was not provided');
  if (!password) throw new Error('Password was not provided');
  if (!passwordConfirmation) throw new Error('Password confirmation was not provided');

  if (password !== passwordConfirmation) {
    throw new Error('Passwords do not match');
  }

  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const response = await fetch('/api/signup', {
    method: 'POST',
    body: formData,
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Internal server error');
    }
    if (data?.detail) {
      throw new Error(String(data.detail));
    }
    throw new Error(data ? JSON.stringify(data) : 'Sign up failed');
  }

  if (data && typeof data.access_token === 'string') {
    storeAuthData(data.access_token);
  }

  return data as AuthResponse;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PERMISSIONS_KEY);
};
