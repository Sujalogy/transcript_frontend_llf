import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Book, Home, Library, Settings, User as UserIcon, LogOut, Menu, X, LucidePanelTopClose } from "lucide-react";
import { logout } from "@/redux/authSlice";

export default function Navigation() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false); // Close mobile menu when route changes
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Book className="h-8 w-8 text-primary" />
          <span className="font-heading text-2xl font-bold">StoryWeaver</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground font-medium transition-colors flex items-center gap-1">
            <Home size={18} />
            <span>Home</span>
          </Link>
          {isAuthenticated && (
            <Link to="/admin" className="text-foreground/80 hover:text-foreground font-medium transition-colors flex items-center gap-1">
              <LucidePanelTopClose size={18} />
              <span>Admin</span>
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* <Link to="/profile" className="flex items-center gap-1 text-foreground/80 hover:text-foreground font-medium transition-colors">
                <UserIcon size={18} />
                <span>{user?.firstName} {user?.lastName}</span>
              </Link> */}
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col gap-4 p-6 bg-white border-t border-border">
            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>



            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
                  <UserIcon size={18} />
                  <span>{user?.firstName} {user?.lastName}</span>
                </Link>
                <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 mt-2">
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button variant="default" asChild className="mt-2">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
