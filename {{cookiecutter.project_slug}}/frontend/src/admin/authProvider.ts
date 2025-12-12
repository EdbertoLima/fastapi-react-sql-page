import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  permissions?: string;
  exp?: number;
}

const TOKEN_KEY = 'token';
const PERMISSIONS_KEY = 'permissions';

const storeToken = (token: string) => {
  const decoded = jwtDecode<TokenPayload>(token);
  if (decoded.permissions) {
    localStorage.setItem(PERMISSIONS_KEY, decoded.permissions);
  }
  localStorage.setItem(TOKEN_KEY, token);
};

const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('/api/token', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || 'Login failed');
    }

    if (data.access_token) {
      storeToken(data.access_token);
      return Promise.resolve();
    }

    throw new Error('Invalid token response');
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PERMISSIONS_KEY);
    return Promise.resolve();
  },

  checkError: (error: any) => {
    const status = error?.status;

    // 401 / 403 → force logout
    if (status === 401 || status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(PERMISSIONS_KEY);
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return Promise.reject();

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.reject();
      }
      return Promise.resolve();
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      return Promise.reject();
    }
  },

  getPermissions: () => {
    const permissions = localStorage.getItem(PERMISSIONS_KEY);
    return Promise.resolve(permissions || 'user');
  },
};

export default authProvider;
