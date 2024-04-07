import UsersMap from "@/components/map/UsersMap";
import MobileSidebar from "@/components/sidebar/MobileSidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import { cn } from "@/lib/utils";

const Chats = () => {
  return (
    <div className="h-full flex ">
      <div className="hidden md:block md:w-[30%]">
        <Sidebar defaultValue="chats" />
      </div>
      <main
        className={cn(
          "h-full w-full p-1 md:p-2 md:w-[70%] md:block"
        )}
      >
        <MobileSidebar />
        <UsersMap/>
      </main>
    </div>
  );
};
export default Chats;

