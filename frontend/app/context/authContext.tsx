import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  username: string | null;
  token: string | null;
  signInUser: (
    username: string,
    password: string
  ) => Promise<{ success: boolean }>;
  signUpUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token from localStorage when app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const signInUser = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const accessToken = data.access; // Django SimpleJWT returns { access, refresh }

      setToken(accessToken);
      setUsername(username);

      // Save to localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("username", username);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  };

  const signUpUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      // after signup, login automatically
      return await signInUser(username, password);
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false };
    }
  };

  const signOut = async () => {
    setUsername(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{ username, token, signInUser, signUpUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
