import { ModeToggle } from "@/shadcn/mode-toggle";
import { Logo } from "./Logo";

export function NavBar() {
  return (
    <nav className="flex items-center gap-5 mt-5">
      <Logo />
      <ModeToggle />
    </nav>
  );
}
