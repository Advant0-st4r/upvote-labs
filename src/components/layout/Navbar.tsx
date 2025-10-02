import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/discovery', label: 'Discovery' },
    { to: '/forum', label: 'Forum' },
    { to: '/project-wizard', label: 'Project Wizard' },
    { to: '/projects', label: 'Projects' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/demo', label: 'Demo' },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">UpvoteLabs</Link>
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="text-muted-foreground hover:text-primary">
              {item.label}
            </Link>
          ))}
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserButton />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground hover:text-primary"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            <SignedIn>
              <Link to="/profile" className="text-muted-foreground hover:text-primary" onClick={toggleMenu}>
                Profile
              </Link>
              <Link to="/settings" className="text-muted-foreground hover:text-primary" onClick={toggleMenu}>
                Settings
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" onClick={toggleMenu}>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};
