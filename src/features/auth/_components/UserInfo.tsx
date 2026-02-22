import SafeImage from "@/components/shared/AppImage";

const UserInfo = ({
  className,
  userData,
  session,
}: {
  className?: string;
  userData?: any;
  session?: any;
}) => {
  console.log("userData", userData);
  return (
    <div className="flex px-4 py-2 items-center gap-3  pb-3 ">
      <SafeImage
        src={userData?.image}
        className={`rounded-full ${className}`}
        alt="User Avatar"
        width={40}
        height={40}
      />
      <div className="flex flex-col min-w-0">
        <p className="text-sm font-semibold truncate">
          {userData?.full_name || session?.user?.name || "N/A"}
        </p>
        <p className="text-xs dark:text-slate-300 truncate">
          {userData?.email || session?.user?.email || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
