import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { cn, generateDeviderLabel } from "@/lib/utils";
import { Chat } from "@/types";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import UserAvatar from "@/components/miscellaneous/UserAvatar";

interface ChatListItemProps{
  chat:Chat;
  currentlyOpened?:boolean;
}

const ChatListItem = ({ chat,currentlyOpened }: ChatListItemProps) => {
  const navigate = useNavigate();

  //console.log("last message",chat.lastMessage);

  const handleClick = useCallback(async () => {
    navigate(`/chat/${chat._id}`);
  }, [chat, navigate]);

  const seen = !false;

  const lastMessage = useMemo(() => {
    if(chat?.lastMessage?.image){
      return "Sent an image"
    }
    if (chat?.lastMessage?.body) {
      if (chat?.lastMessage?.body.length <= 10) {
        return chat?.lastMessage?.body;
      }
      return `${chat?.lastMessage?.body.substring(0, 8)}...`;
    }
    return null;
  }, [chat]);

  const lastMessageAt = useMemo(() => {
    if (chat?.lastMessage?.createdAt) {
      //@ts-ignore
      // return formatDistanceToNow(new Date(chat.lastMessage.createdAt), {
      //   addSuffix: true,
      // });
      return generateDeviderLabel(new Date(chat.lastMessage.createdAt))
    }
    return "";
  }, [chat]);

  // const isSeen = useMemo(() => {
  //   const lastMessage=chat?.lastMessage;
  //   if (chat?.isGroup) {
  //     return lastMessage?.chat?.users?.length === lastMessage?.seenIds?.length;
  //   }
  //   return lastMessage?.seenIds?.length === 2;
  // }, [chat]);


  return (
    <div
      className={cn("w-full flex items-center gap-4 px-4 py-2.5 border-b cursor-pointer rounded-sm transition-all ease-in",!currentlyOpened && "hover:bg-zinc-100" ,currentlyOpened && "bg-muted dark:bg-blue-700",!currentlyOpened && "hover:dark:bg-blue-500")}
      onClick={handleClick}
    >
      <UserAvatar imageUrl={chat.thumbnail || ""} className="dark:border-blue-400"/>
      <div className="w-full flex flex-col">
        <div className="text-gray-800 font-semibold dark:text-gray-300">
          {chat?.name}
        </div>
        <div className="w-full flex items-center justify-between">
          <span
            className={cn(
              "text-sm dark:text-gray-300",
              seen
                ? "text-gray-700"
                : "font-semibold text-blue-700  px-[4px] py-[2px]"
            )}
          >
            {lastMessage}
          </span>
          <small>
            <time className="text-xs font-light text-gray-600 dark:text-gray-300">
              {lastMessageAt}
            </time>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
