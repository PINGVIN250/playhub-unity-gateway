
import { NavLink } from "./NavLink";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { User } from "@/types";

interface DesktopNavProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

export function DesktopNav({ isAuthenticated, user, logout }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/games">Games</NavLink>
      <NavLink to="/about">About</NavLink>
      
      {isAuthenticated && (
        <NavLink to="/dashboard">Dashboard</NavLink>
      )}
      
      {isAuthenticated ? (
        <UserMenu user={user} logout={logout} />
      ) : (
        <AuthButtons />
      )}
    </nav>
  );
}
