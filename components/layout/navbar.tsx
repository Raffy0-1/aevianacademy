"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
  const [scrolled, setScrolled] = useState(false);
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

  // Scroll detection for enhanced glass shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="sticky top-0 z-50 w-full px-3 pt-3 pb-2 sm:px-6 sm:pt-4 transition-all duration-300">
      {/* Floating Island Dock Container */}
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-full border transition-all duration-300",
          scrolled
            ? "border-slate-300/60 bg-white/70 dark:bg-navy-dark/75 dark:border-navy-light/40 backdrop-blur-xl shadow-[0_12px_36px_-10px_rgba(28,42,56,0.1),0_2px_8px_rgba(0,0,0,0.03)]"
            : "border-slate-200/60 bg-white/60 dark:bg-navy-dark/65 dark:border-navy-light/30 backdrop-blur-md shadow-[0_8px_24px_-8px_rgba(28,42,56,0.04)]"
        )}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand Logo with micro-scale on hover */}
          <Link
            href="/"
            aria-label="Aevian Academy Home"
            className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation Links — Centered Pill Dock */}
          <nav className="hidden items-center gap-1 lg:flex bg-slate-200/40 dark:bg-navy/40 p-1 rounded-full border border-slate-200/40 dark:border-slate-800/40 backdrop-blur-xs">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 select-none",
                    isActive
                      ? "bg-navy text-white shadow-xs dark:bg-copper"
                      : "text-slate hover:text-navy hover:bg-white/80 dark:text-slate-light dark:hover:text-white dark:hover:bg-navy-light/60"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth State Area & Theme Toggle */}
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <div className="h-4 w-px bg-slate-300/60 dark:bg-navy-light/60" aria-hidden="true" />
            {auth.authenticated && auth.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 rounded-full border border-slate-border/80 bg-white/90 py-1 pl-1.5 pr-3 shadow-xs transition-all hover:border-copper/60 hover:shadow-sm dark:bg-navy/80 dark:border-navy-light cursor-pointer active:scale-[0.98]"
                  aria-expanded={dropdownOpen}
                  aria-label="User profile menu"
                >
                  {/* Initial Badge / Avatar */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-cream dark:bg-copper dark:text-white">
                    {getInitials(auth.user.name)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-navy line-clamp-1 dark:text-cream max-w-[110px]">
                      {auth.user.name}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-copper">
                      {auth.user.role.toLowerCase()}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate opacity-70" />
                </button>

                {/* Profile Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-border bg-white p-2 shadow-2xl backdrop-blur-xl dark:bg-navy dark:border-navy-light z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-navy transition-colors hover:bg-cream-muted dark:text-cream dark:hover:bg-navy-light/60"
                      >
                        <LayoutDashboard className="h-4 w-4 text-copper" />
                        <span>My Dashboard</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-border/60 pt-1 dark:border-navy-light">
                      <form action="/api/auth/signout" method="POST">
                        <button
                          type="submit"
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
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
                  className="px-3 py-1.5 text-xs font-bold text-navy hover:text-copper transition-colors dark:text-cream"
                >
                  Log in
                </Link>

                {/* Nested Island Button (Button-in-Button Trailing Icon Architecture) */}
                <Link href="/book-trial" className="group">
                  <div className="inline-flex items-center gap-2 rounded-full bg-copper pl-4 pr-1.5 py-1 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(200,109,81,0.25)] hover:shadow-[0_4px_14px_rgba(200,109,81,0.35)] hover:bg-copper-hover active:scale-[0.98] transition-all cursor-pointer">
                    <span>Book Free Trial</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle className="h-9 w-9" />
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-navy-light/60 transition-all hover:bg-slate-200 text-navy dark:text-cream cursor-pointer"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu — Floating Card Overlay */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-navy-light/50 dark:bg-[#111A24]/95 lg:hidden animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3">
            {/* Authenticated user mobile card */}
            {auth.authenticated && auth.user && (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-border bg-card p-3 shadow-xs">
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

            <div className="grid grid-cols-2 gap-1.5 py-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-colors",
                    pathname === link.href
                      ? "bg-copper/10 text-copper font-bold"
                      : "text-navy dark:text-cream hover:bg-cream-muted"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-2 pt-3 border-t border-slate-border/50 flex flex-col gap-2.5">
              {auth.authenticated && auth.user ? (
                <>
                  <Link href={auth.user.dashboardUrl} onClick={() => setOpen(false)}>
                    <div className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-copper py-3 text-sm font-semibold text-white shadow-sm hover:bg-copper-hover active:scale-[0.98]">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Go to Dashboard</span>
                    </div>
                  </Link>
                  <form action="/api/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="w-full text-center py-2.5 text-xs font-semibold text-rose-600 border border-rose-200/80 rounded-full hover:bg-rose-50 transition-colors"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-center py-2.5 text-sm font-semibold text-navy border border-slate-200 rounded-full hover:bg-cream-muted dark:text-cream"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link href="/book-trial" onClick={() => setOpen(false)}>
                    <div className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-copper py-3 text-sm font-semibold text-white shadow-sm hover:bg-copper-hover active:scale-[0.98]">
                      <span>Book Free Trial</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
