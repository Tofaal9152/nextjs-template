import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

import UserMenu from "./UserMenu";
import { getSession } from "@/lib/session";
const AuthSwitcher = async () => {
  const session = await getSession();

  if (!session) {
    return <UserMenu session={session} />;
  }

  return (
    <Button asChild className="gap-2">
      <Link href="/signin" aria-label="Go to sign in">
        <LogIn className="h-4 w-4" aria-hidden />
        Login
      </Link>
    </Button>
  );
};

export default AuthSwitcher;
