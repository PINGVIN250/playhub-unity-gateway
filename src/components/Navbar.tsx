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
import { Search, Plus, Heart, Moon, Sun } from "lucide-react";

export function Navbar() {
  const { user, signOut } = useAuth();
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

  return (
    <nav className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex items-center py-4">
        <Link to="/" className="font-bold text-2xl mr-6">
          Game Hub
        </Link>

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

        <ul className="flex items-center gap-4">
          <li>
            <ModeToggle />
          </li>
          {user ? (
            <>
              <li className="flex items-center">
                <Link to="/games/new">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить игру
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
                        <AvatarImage src={user.avatarUrl} />
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
                      <Link to="/account">Настройки</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        signOut();
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
