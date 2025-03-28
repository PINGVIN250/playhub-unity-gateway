
import { Link } from "react-router-dom";
import { NavLink } from "./NavLink";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { User as UserType } from "@/types";

interface MobileMenuProps {
  isAuthenticated: boolean;
  user: UserType | null;
  logout: () => void;
  isOpen: boolean;
}

export function MobileMenu({ isAuthenticated, user, logout, isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b shadow-md animate-fade-in">
      <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/about">About</NavLink>
        
        {isAuthenticated && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}
        
        {isAuthenticated ? (
          <UserMenu user={user} logout={logout} isMobile={true} />
        ) : (
          <AuthButtons isMobile={true} />
        )}
      </nav>
    </div>
  );
}
