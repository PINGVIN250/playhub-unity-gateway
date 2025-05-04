
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle";
import { Search, Plus, Heart, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/games?q=${searchQuery}`);
    }
  };

  // Check if we're on the home page
  const isHomePage = window.location.pathname === "/";

  return (
    <nav className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex items-center py-4">
        <Link to="/" className="font-bold text-2xl mr-6">
          Game Hub
        </Link>

        {!isHomePage && (
          <form onSubmit={handleSearchSubmit} className="flex-1 mr-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pr-10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        <ul className="flex items-center gap-4 ml-auto">
          <li>
            <ModeToggle />
          </li>
          {user ? (
            <>
              <li className="flex items-center">
                <Link to="/dashboard">
                  <Button size="sm">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Панель разработчика
                  </Button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link to="/favorites" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>Избранное</span>
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to={`/user/${user.id}`}>Профиль</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Настройки</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                    >
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Войти</Link>
              </li>
              <li>
                <Link to="/register">Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
