
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="text-sm font-medium transition-colors hover:text-primary"
    >
      {children}
    </Link>
  );
}
