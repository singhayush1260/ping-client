import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Settings from "@/components/modals/Settings";
import ViewProfile from "@/components/modals/ViewProfile";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "@/components/theme/ThemeToggle";
import UserAvatar from "./UserAvatar";
import ConnectionRequest from "@/components/modals/ConnectionRequests";

interface UserMenuProps{
    imageUrl:string |undefined;
    name:string;
}

const UserMenu = ({imageUrl,name}:UserMenuProps) => {

  return (
    <Popover>
      <PopoverTrigger>
      <UserAvatar imageUrl={imageUrl} fallback={name}/>
      </PopoverTrigger>
      <PopoverContent className="w-[110px] space-y-1 px-2 mr-10">
        <div className="font-semibold border-b px-2">Account</div>
        <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-muted dark:text-gray-300 ">
          <ViewProfile/>
        </div>
        <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-muted dark:text-gray-300 ">
          <ConnectionRequest/>
        </div>
        <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-muted dark:text-gray-300 ">
          <Settings/>
        </div>
        <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-muted dark:text-gray-300 ">
         <LogoutButton>
          <span>Logout</span>
         </LogoutButton>
        </div>
        <div className=" p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-muted dark:text-gray-300 ">
          <ThemeToggle/>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default UserMenu;

