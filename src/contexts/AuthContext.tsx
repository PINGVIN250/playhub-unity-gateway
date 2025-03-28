
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthResponse, Session, WeakPassword } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (username: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for active session on load
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (session?.user) {
          // Get user profile data
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            throw profileError;
          }
          
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            username: profileData.username,
            createdAt: new Date(profileData.created_at),
            isAdmin: profileData.is_admin
          });
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          try {
            // Get user profile data
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (profileError) throw profileError;
            
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              username: profileData.username,
              createdAt: new Date(profileData.created_at),
              isAdmin: profileData.is_admin
            });
          } catch (error) {
            console.error("Profile fetch failed:", error);
          }
        } else {
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (response.error) {
        throw response.error;
      }
      
      toast.success(`Welcome back!`);
      return response;
    } catch (error) {
      console.error("Login error:", error);
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
      // Register user
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          },
        }
      });
      
      if (response.error) {
        throw response.error;
      }
      
      // Update the username in the profiles table directly if needed
      // This is a fallback in case the trigger doesn't work correctly
      if (response.data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ username })
          .eq('id', response.data.user.id);
          
        if (profileError) {
          console.error("Profile update failed:", profileError);
        }
      }
      
      toast.success("Registration successful! Please check your email for verification.");
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      const message = error instanceof Error ? error.message : "Registration failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
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
