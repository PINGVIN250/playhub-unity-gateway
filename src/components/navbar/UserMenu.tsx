
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { User as UserType } from "@/types";

interface UserMenuProps {
  user: UserType | null;
  logout: () => void;
  isMobile?: boolean;
}

export function UserMenu({ user, logout, isMobile = false }: UserMenuProps) {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 pt-2 border-t">
        <Link to="/profile" className="w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <User className="h-4 w-4 mr-2" />
            <span>{user?.username}</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={logout}
        className="flex items-center gap-1"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </Button>
      <Link to="/profile">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <User className="h-4 w-4" />
          <span>{user?.username}</span>
        </Button>
      </Link>
    </div>
  );
}
