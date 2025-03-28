
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

interface AuthButtonsProps {
  isMobile?: boolean;
}

export function AuthButtons({ isMobile = false }: AuthButtonsProps) {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 pt-2 border-t">
        <Link to="/login" className="w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <LogIn className="h-4 w-4 mr-2" />
            <span>Login</span>
          </Button>
        </Link>
        <Link to="/register" className="w-full">
          <Button
            variant="default"
            size="sm"
            className="w-full justify-start"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            <span>Register</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
        >
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </Link>
      <Link to="/register">
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-1"
        >
          <UserPlus className="h-4 w-4" />
          <span>Register</span>
        </Button>
      </Link>
    </div>
  );
}
