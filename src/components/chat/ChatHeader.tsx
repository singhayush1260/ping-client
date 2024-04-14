import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Chat, User } from "@/types";
import MobileDrawer from "@/components/miscellaneous/MobileDrawer";
import SideDrawer from "@/components/miscellaneous//SideDrawer";
import ChatInfo from "./ChatInfo";
import GroupInfo from "./GroupInfo";
import UserAvatar from "@/components/miscellaneous//UserAvatar";
import { format } from "date-fns";


interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const { users } = chat;
  const otherUser: User = users[0];

  // const onlineStatus2=otherUser.isOnline==="Online" ?  "Online" :"last seen "+formatDistanceToNow(new Date(otherUser.isOnline), {
  //     addSuffix: true,
  //    });

  const onlineStatus=useMemo(()=>{

    return otherUser.isOnline === "Online" ? "Online" : `last seen ${format(new Date(otherUser.isOnline), "hh:mm")} ${format(
      new Date(otherUser.isOnline),
      "a"
    )} `
    // return `${
    //   otherUser.isOnline === "Online" ? "Online" : "last seen"
    // } ${format(new Date(otherUser.isOnline), "hh:mm")} ${format(
    //   new Date(otherUser.isOnline),
    //   "a"
    // )}`
  },[otherUser.isOnline])

  return (
    <div className="relative h-[10%] md:h-[12%] w-full flex justify-between items-center px-2 md:px-5 pt-2 pb-2 md:py-9 border-b">
      <div className="flex items-center">
        <MdKeyboardArrowLeft
          size={23}
          className="md:hidden text-gray-600"
          onClick={() => navigate("/chats")}
        />
        <div className="relative">
          <UserAvatar imageUrl={chat.thumbnail || ""} />
          {onlineStatus === "Online" && (
            <div className="w-3 h-3 rounded-full bg-green-400 absolute right-0 bottom-0"></div>
          )}
        </div>
        <div className="flex flex-col ml-3">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {chat.name}
          </span>
          <span className="text-xs md:text-sm font-light text-gray-800 dark:text-gray-300">
            {onlineStatus}
          </span>
        </div>
      </div>
      <div className="hidden md:block">
        <SideDrawer
          trigger={
            <BsThreeDotsVertical className="text-gray-700 dark:text-gray-300" />
          }
        >
          {chat?.isGroup ? <GroupInfo chat={chat} /> : <ChatInfo chat={chat} />}
        </SideDrawer>
      </div>
      <div className="md:hidden">
        <MobileDrawer
          trigger={
            <BsThreeDotsVertical className="text-gray-700 dark:text-gray-300" />
          }
        >
          {chat?.isGroup ? <GroupInfo chat={chat} /> : <ChatInfo chat={chat} />}
        </MobileDrawer>
      </div>
    </div>
  );
};
export default ChatHeader;
