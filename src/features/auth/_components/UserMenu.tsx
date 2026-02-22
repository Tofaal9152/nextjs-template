"use client";

import SafeImage from "@/components/shared/AppImage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import { useFetchData } from "@/hooks/useFetchData";
import { cn } from "@/lib/utils";
import UserMenuPopover from "./UserMenuPopover";

const AVATAR_SIZE = 40;

const UserMenu = ({ session }: { session: any }) => {
  const role = session?.user?.role ?? "GUEST";

  const {
    data: userData,
    isLoading,
    error,
  } = useFetchData<any>({
    querykey: ["student-profile-data"],
    url: "/student/profile/",
    options: {
      enabled: role === "STUDENT",
    },
  });

  const imageSrc =
    (role === "STUDENT" ? userData?.image : session?.user?.image) ?? undefined;

  return (
    <AsyncStateWrapper
      loading={role === "STUDENT" ? isLoading : false}
      error={error?.message || "Failed to load user data"}
    >
      <Popover>
        <PopoverTrigger
          className={cn(
            "flex items-center justify-center rounded-full",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          )}
          aria-label="Open user menu"
        >
          <SafeImage
            src={imageSrc}
            alt={session?.user?.name || "User Avatar"}
            className="rounded-full cursor-pointer"
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
        </PopoverTrigger>

        <PopoverContent
          className="w-72 dark:bg-slate-950 p-0"
          align="end"
          sideOffset={8}
        >
          <UserMenuPopover userData={userData} role={role} session={session} />
        </PopoverContent>
      </Popover>
    </AsyncStateWrapper>
  );
};

export default UserMenu;
