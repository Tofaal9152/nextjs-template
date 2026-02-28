"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { destroySession } from "@/lib/session";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useState } from "react";

const SignOut = () => {
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await destroySession();
      qc.clear();
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={loading}
      variant="default"
      size="sm"
      className="w-full"
    >
      {loading && <Spinner className="mr-2" />}
      <LogOut size={16} />
      Sign Out
    </Button>
  );
};

export default SignOut;
