import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Stories of Change", href: "/stories" },
    { name: "Blog", href: "/blog" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === location || (href !== "/" && location.startsWith(href));

  const renderNavLink = (item: typeof navigation[number], mobile = false) => {
    const active = isActive(item.href);
    const baseClasses = mobile
      ? "block px-3 py-2 text-base font-medium transition-colors"
      : "px-3 py-2 text-sm font-medium transition-colors";

    const activeClasses = mobile
      ? "text-primary-500 bg-primary-50"
      : "text-primary-500 border-b-2 border-primary-500";

    const inactiveClasses = mobile
      ? "text-gray-600 hover:text-primary-500 hover:bg-gray-50"
      : "text-gray-600 hover:text-primary-500";

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
        aria-current={active ? "page" : undefined}
        onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center min-w-0">
            <img 
              src="/assets/access_logo.jpg" 
              alt="Access Global Foundation Logo" 
              className="h-10 w-auto mr-2 sm:mr-3"
            />
            <span className="font-bold text-base sm:text-lg md:text-xl text-gray-900 whitespace-nowrap text-ellipsis max-w-[160px] sm:max-w-none">
              Access Global Foundation
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => renderNavLink(item))}
            </div>
          </div>

          {/* Donate + Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <Link href="/donate" className="hidden md:block">
              <Button className="bg-warning-500 hover:bg-warning-600 text-white">
                <i className="fas fa-heart mr-1"></i> Donate Now
              </Button>
            </Link>
            <button
              className="md:hidden text-gray-600 hover:text-primary-500"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => renderNavLink(item, true))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
