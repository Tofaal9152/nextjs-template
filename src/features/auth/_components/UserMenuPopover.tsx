"use client";

import { Divider } from "@/components/ui/divider";
import { Row } from "@/components/ui/row";
import { Settings } from "lucide-react";
import SignOut from "../_pages/signout/SignOut";
import UserInfo from "./UserInfo";

const UserMenuPopover = ({
  userData,
  role,
  session,
}: {
  session?: any;
  userData?: any;
  role: string;
}) => {
  return (
    <div className="flex flex-col text-slate-800 dark:text-slate-200">
      {/* User header */}
      <div className="p-3">
        <UserInfo userData={userData} session={session} className="w-12 h-12" />
      </div>

      <Divider />

      {/* tabs */}
      {role === "STUDENT" && (
        <>
          <Row href="/profile">
            <Settings className="w-4 h-4" aria-hidden />
            <span className="text-xs font-medium">Manage Account</span>
          </Row>
          <Divider />
        </>
      )}

      {/* Sign Out */}
      <div className="p-2">
        <SignOut />
      </div>
    </div>
  );
};

export default UserMenuPopover;
