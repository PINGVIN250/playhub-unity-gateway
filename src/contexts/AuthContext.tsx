
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  isBanned: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBanned, setIsBanned] = useState<boolean>(false);

  // Полная синхронизация пользователя с Supabase
  const syncUser = async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session?.user) {
        // Получаем полные данные пользователя
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) throw profileError;
        
        // Проверяем статус блокировки
        if (profile?.is_banned) {
          setIsBanned(true);
          await supabase.auth.signOut();
          setUser(null);
          localStorage.removeItem('sb-user');
          return;
        }
        
        const userData = {
          id: session.user.id,
          email: session.user.email || '',
          username: profile?.username || '',
          createdAt: profile?.created_at ? new Date(profile.created_at) : new Date(),
          isAdmin: profile?.is_admin || false,
          isBanned: profile?.is_banned || false
        };
        
        setUser(userData);
        setIsBanned(false);
        localStorage.setItem('sb-user', JSON.stringify({
          ...userData,
          _token: session.access_token
        }));
      } else {
        setUser(null);
        setIsBanned(false);
        localStorage.removeItem('sb-user');
      }
    } catch (error) {
      console.error('Auth sync error:', error);
      setUser(null);
      setIsBanned(false);
      localStorage.removeItem('sb-user');
    } finally {
      setIsLoading(false);
    }
  };

  // Проверка актуальности сохраненного пользователя
  const validateStoredUser = async () => {
    const storedUser = localStorage.getItem('sb-user');
    if (!storedUser) return null;
    
    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser?._token) {
        localStorage.removeItem('sb-user');
        return null;
      }
      
      // Проверяем токен с Supabase
      const { data: { user }, error } = await supabase.auth.getUser(parsedUser._token);
      
      if (error || !user) {
        localStorage.removeItem('sb-user');
        return null;
      }
      
      return parsedUser;
    } catch (e) {
      localStorage.removeItem('sb-user');
      return null;
    }
  };

  useEffect(() => {
    // 1. Проверяем сохраненного пользователя
    const initializeAuth = async () => {
      const validUser = await validateStoredUser();
      if (validUser) {
        setUser(validUser);
      }
      
      // 2. Полная синхронизация с Supabase
      await syncUser();
      
      // 3. Подписываемся на изменения аутентификации
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          syncUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsBanned(false);
          localStorage.removeItem('sb-user');
        }
      });
      
      return () => subscription?.unsubscribe();
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Проверяем статус блокировки после входа
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('is_banned')
          .eq('id', authUser.id)
          .single();
        
        if (profileError) {
          console.error('Error checking ban status:', profileError);
        } else if (profileData?.is_banned) {
          setIsBanned(true);
          await supabase.auth.signOut();
          throw new Error('Ваш аккаунт заблокирован за нарушение правил сообщества');
        }
      }
      
      await syncUser();
      toast.success('Добро пожаловать!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });
      
      if (error) throw error;
      
      toast.success('Registration successful! Please check your email.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send password reset email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsBanned(false);
      localStorage.removeItem('sb-user');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated: !!user,
    isBanned,
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
