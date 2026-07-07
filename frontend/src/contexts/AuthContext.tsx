import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiUrl } from "../lib/api";

interface User {
  id: string;
  username: string;
  name: string;
  birthDate: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<User>;
  register: (username: string, password: string, name: string, birthDate: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

function clearStoredAuth() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function readStoredAuth(): { token: string; user: User } | null {
  const savedToken = sessionStorage.getItem(TOKEN_KEY);
  const savedUser = sessionStorage.getItem(USER_KEY);

  if (savedToken && savedUser) {
    try {
      return { token: savedToken, user: JSON.parse(savedUser) as User };
    } catch {
      clearStoredAuth();
      return null;
    }
  }

  return null;
}

function persistAuth(token: string, user: User) {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      const stored = readStoredAuth();
      if (!stored) {
        if (!cancelled) setIsAuthReady(true);
        return;
      }

      try {
        const response = await fetch(apiUrl("/api/auth/me"), {
          headers: { Authorization: `Bearer ${stored.token}` },
        });

        if (!response.ok) {
          clearStoredAuth();
          if (!cancelled) {
            setToken(null);
            setUser(null);
            setIsAuthReady(true);
          }
          return;
        }

        const data = await response.json();
        if (!cancelled) {
          setToken(stored.token);
          setUser(data.user);
          sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
          setIsAuthReady(true);
        }
      } catch {
        clearStoredAuth();
        if (!cancelled) {
          setToken(null);
          setUser(null);
          setIsAuthReady(true);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (username: string, password: string): Promise<User> => {
    const response = await fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const text = await response.text();

    if (!response.ok) {
      let errorMessage = "로그인에 실패했습니다.";
      try {
        const data = JSON.parse(text);
        errorMessage = data.error || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = JSON.parse(text);
    setToken(data.token);
    setUser(data.user);
    persistAuth(data.token, data.user);
    return data.user as User;
  };

  const register = async (
    username: string,
    password: string,
    name: string,
    birthDate: string
  ): Promise<User> => {
    const response = await fetch(apiUrl("/api/auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name, birthDate }),
    });

    const text = await response.text();

    if (!response.ok) {
      let errorMessage = "회원가입에 실패했습니다.";
      try {
        const data = JSON.parse(text);
        errorMessage = data.error || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = JSON.parse(text);
    setToken(data.token);
    setUser(data.user);
    persistAuth(data.token, data.user);
    return data.user as User;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearStoredAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.isAdmin || false,
        isAuthReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
