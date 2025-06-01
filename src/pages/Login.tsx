
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Gamepad, ShieldX } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов")
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login, isAuthenticated, isLoading: authLoading, isBanned } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Ошибка входа:", error);
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Проверка аутентификации...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="glass-card p-8">
            <div className="flex flex-col items-center mb-6">
              <Gamepad className="h-10 w-10 text-primary mb-2" />
              <h1 className="text-3xl font-bold">Добро пожаловать</h1>
              <p className="text-muted-foreground text-center mt-1">
                Войдите, чтобы получить доступ к вашим играм и панели управления
              </p>
            </div>
            
            {isBanned && (
              <Alert className="mb-6 border-destructive">
                <ShieldX className="h-4 w-4" />
                <AlertDescription className="text-destructive">
                  <strong>Ваш аккаунт заблокирован</strong><br />
                  Ваш аккаунт был заблокирован за нарушение правил сообщества. 
                  Для получения дополнительной информации обратитесь к администрации.
                </AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Введите ваш email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Введите ваш пароль" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting || isBanned}
                >
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Войти
                </Button>
                
                <p className="text-center text-sm">
                  Нет аккаунта?{" "}
                  <Link 
                    to="/register" 
                    className="text-primary hover:underline"
                  >
                    Зарегистрироваться
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
