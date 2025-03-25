
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API for now, will be replaced with actual implementation
const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    createdAt: new Date(),
    isAdmin: true
  }
];

// Mock storage
const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate checking auth state
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock login logic
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === "password") { // In a real app, use proper password verification
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.username}!`);
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        username,
        email,
        createdAt: new Date(),
      };

      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
