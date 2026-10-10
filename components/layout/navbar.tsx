"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/programs", label: "Programs" },
  { href: "/teachers", label: "Teachers" },
  { href: "/parents", label: "Parents" },
  { href: "/countries", label: "Countries" },
  { href: "/pricing", label: "Pricing" },
];

interface AuthState {
  authenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    dashboardUrl: string;
  } | null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [auth, setAuth] = useState<AuthState>({ authenticated: false, user: null });
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setAuth(data);
          }
        }
      } catch (err) {
        // Silently keep default unauthenticated state
      }
    }
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Handle outside click for user dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Aevian Academy Home">
          <BrandLogo size="md" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-copper relative py-1",
                  isActive
                    ? "text-copper font-semibold"
                    : "text-navy/80 dark:text-cream/80"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth State Area */}
        <div className="hidden items-center gap-4 lg:flex">
          {auth.authenticated && auth.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-full border border-slate-border/80 bg-white/80 py-1.5 pl-2 pr-3.5 shadow-xs transition-all hover:border-copper/60 hover:shadow-sm dark:bg-navy/80 dark:border-navy-light"
                aria-expanded={dropdownOpen}
                aria-label="User profile menu"
              >
                {/* Initial Badge / Avatar */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-cream dark:bg-copper dark:text-white">
                  {getInitials(auth.user.name)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-navy line-clamp-1 dark:text-cream max-w-[120px]">
                    {auth.user.name}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-copper">
                    {auth.user.role.toLowerCase()}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate opacity-70" />
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-border bg-white p-1.5 shadow-xl backdrop-blur-md dark:bg-navy dark:border-navy-light z-50">
                  <div className="border-b border-slate-border/60 p-2.5 dark:border-navy-light">
                    <p className="text-xs font-bold text-navy dark:text-cream truncate">
                      {auth.user.name}
                    </p>
                    <p className="text-[11px] text-slate dark:text-slate-light truncate">
                      {auth.user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href={auth.user.dashboardUrl}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-navy transition-colors hover:bg-cream-muted dark:text-cream dark:hover:bg-navy-light/60"
                    >
                      <LayoutDashboard className="h-4 w-4 text-copper" />
                      <span>My Dashboard</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-border/60 pt-1 dark:border-navy-light">
                    <form action="/api/auth/signout" method="POST">
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-navy hover:text-copper transition-colors dark:text-cream"
              >
                Log in
              </Link>
              <Link href="/book-trial">
                <Button variant="copper" size="sm" className="gap-1.5 shadow-sm">
                  <span>Book Free Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden transition-colors hover:bg-muted text-navy dark:text-cream"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          "grid overflow-hidden border-t border-border bg-background/98 transition-all duration-300 lg:hidden shadow-xl",
          open ? "grid-rows-[1fr] opacity-100 py-4" : "grid-rows-[0fr] opacity-0 py-0"
        )}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-4 py-2">
            {/* Authenticated user mobile card */}
            {auth.authenticated && auth.user && (
              <div className="flex items-center gap-3 rounded-xl border border-slate-border bg-card p-3 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-cream">
                  {getInitials(auth.user.name)}
                </div>
                <div className="flex-1 truncate">
                  <div className="text-sm font-bold text-navy dark:text-cream truncate">
                    {auth.user.name}
                  </div>
                  <div className="text-xs text-copper font-medium uppercase tracking-wider">
                    {auth.user.role.toLowerCase()}
                  </div>
                </div>
              </div>
            )}

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium py-2 border-b border-border/40 transition-colors",
                  pathname === link.href ? "text-copper font-semibold" : "text-navy dark:text-cream hover:text-copper"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              {auth.authenticated && auth.user ? (
                <>
                  <Link href={auth.user.dashboardUrl} onClick={() => setOpen(false)}>
                    <Button variant="copper" size="lg" className="w-full justify-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Go to Dashboard</span>
                    </Button>
                  </Link>
                  <form action="/api/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="w-full text-center py-2.5 text-sm font-semibold text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-center py-2.5 text-base font-semibold text-navy border border-border rounded-lg hover:bg-muted dark:text-cream"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link href="/book-trial" onClick={() => setOpen(false)}>
                    <Button variant="copper" size="lg" className="w-full justify-center">
                      Book Free Trial
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
