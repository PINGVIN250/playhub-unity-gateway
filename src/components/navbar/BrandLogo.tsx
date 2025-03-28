
import { Link } from "react-router-dom";
import { Gamepad } from "lucide-react";

export function BrandLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-2xl font-bold transition-opacity hover:opacity-80"
    >
      <Gamepad className="h-6 w-6" />
      <span>UnityPlay</span>
    </Link>
  );
}
