import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserMenu from "@/components/miscellaneous/UserMenu";
import ChatList from "./ChatList";
import Logo from "@/components/miscellaneous/Logo";
import UsersTab from "./UsersTab";
import CallList from "./CallList";
import { PiHandsClappingDuotone } from "react-icons/pi";

export interface SidebarProps {
  defaultValue?: string;
  tabTriggers?: { label: string; value: string }[];
  tabContents?: React.ReactNode;
}

const Sidebar = ({ defaultValue }: SidebarProps) => {
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const defaultVal = useMemo(() => {
    const pathName = window.location.pathname;
    switch (pathName) {
      case "/":
        return "users";
      case "/chats":
        return "chats";
      default:
        return defaultValue;
    }
  }, [window.location]);

  return (
    <aside className="md:block h-full border-r relative">
      <div className="flex justify-between items-center px-5 py-4 border-b">
        <Logo title="PINNG" icon={<PiHandsClappingDuotone size={28} />} />
        <UserMenu
          name={currentUser?.name}
          imageUrl={currentUser?.profilePicture}
        />
      </div>
      <div className="p-3">
        <Tabs defaultValue={defaultVal} className="w-full">
          <TabsList className="w-full mb-2">
            <TabsTrigger
              value="users"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Users
            </TabsTrigger>
            <TabsTrigger value="chats" className="w-full">
              Chats
            </TabsTrigger>
            <TabsTrigger value="calls" className="w-full">
              Calls
            </TabsTrigger>
          </TabsList>
          <div className="h-[300px] overflow-y-auto no-scrollbar">
            <TabsContent value="users">
              <UsersTab />
            </TabsContent>
            <TabsContent value="chats">
              <ChatList />
            </TabsContent>
            <TabsContent value="calls">
              <CallList />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </aside>
  );
};

export default Sidebar;
