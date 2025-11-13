import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-foreground">Greet 'n</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" className="text-orange font-semibold">
            Thanksgiving
          </Button>
          <Button variant="ghost" className="font-semibold">
            Holiday
          </Button>
          <Button variant="ghost" className="font-semibold">
            Birthdays
          </Button>
          <Button variant="ghost" className="font-semibold">
            Weddings
          </Button>
          <Button variant="ghost" className="font-semibold">
            Dinners
          </Button>
          <Button variant="ghost" className="font-semibold">
            For Orgs
          </Button>
          <Button
            variant="secondary"
            className="rounded-full font-semibold"
            asChild
          >
            <Link to="/create-greeting-card">Cards</Link>
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="font-semibold hidden sm:inline-flex"
          >
            Blog
          </Button>
          <Button
            variant="ghost"
            className="font-semibold hidden sm:inline-flex"
          >
            Login
          </Button>
          <Button variant="default" className="font-semibold" asChild>
            <Link to="/create-greeting-card">Create</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
