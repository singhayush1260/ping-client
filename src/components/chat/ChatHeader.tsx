import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Chat } from "@/types";
import MobileDrawer from "@/components/miscellaneous/MobileDrawer";
import SideDrawer from "@/components/miscellaneous//SideDrawer";
import ChatInfo from "./ChatInfo";
import GroupInfo from "./GroupInfo";
import UserAvatar from "@/components/miscellaneous//UserAvatar";

interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader = ({ chat }: ChatHeaderProps) => {

const navigate = useNavigate();
  
  return (
    <div className="relative h-[12%] w-full flex justify-between items-center px-2 md:px-5 py-3 md:py-9 border-b">
      <div className="flex items-center">
        <MdKeyboardArrowLeft
          size={23}
          className="md:hidden text-gray-600"
          onClick={() => navigate("/chats")}
        />
       <UserAvatar imageUrl={chat.thumbnail || ""}/>
        <div className="flex flex-col ml-3">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {chat.name}
          </span>
          <span className="text-xs md:text-sm font-light text-gray-600 dark:text-gray-300">
            last seen at 5:54 PM
          </span>
        </div>
      </div>
     <div className="hidden md:block">
   <SideDrawer trigger={ <BsThreeDotsVertical className="text-gray-700 dark:text-gray-300"/>}>
    {chat?.isGroup ? <GroupInfo chat={chat}/> : <ChatInfo chat={chat}/>}
   </SideDrawer>
     </div>
     <div className="md:hidden">
      <MobileDrawer trigger={ <BsThreeDotsVertical className="text-gray-700 dark:text-gray-300"/>}>
      {chat?.isGroup ? <GroupInfo chat={chat}/> : <ChatInfo chat={chat}/>}
      </MobileDrawer>
     </div>
    </div>
  );
};
export default ChatHeader;
