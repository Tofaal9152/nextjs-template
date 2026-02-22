import { ModeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { imagePath } from "@/constants/imagePath";
import SignOut from "@/features/auth/_pages/signout/SignOut";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  session?: any;
}

interface NavItem {
  label: string;
  href: string;
}

export default function Navbar({ session }: NavbarProps) {
  const publicLinks: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const privateLinks: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Booking", href: "/khar-academy/my-bookings" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const navLinks = session ? privateLinks : publicLinks;

  return (
    <header className="sticky top-0 z-50 px-6 md:px-12 lg:px-20 py-4 border-b backdrop-blur-sm bg-background/80">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={imagePath.noImage}
            alt="Logo"
            width={120}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ModeToggle />

          {session ? (
            <SignOut />
          ) : (
            <Link href="/auth/signin">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>

        {/* Mobile (Sheet) */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px] sm:w-[340px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src={imagePath.noImage}
                    alt="Logo"
                    width={96}
                    height={40}
                    className="h-10 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            <SheetFooter>
              {session ? (
                <SignOut />
              ) : (
                <Link href="/auth/signin" className="w-full">
                  <Button size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
