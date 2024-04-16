import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { cn, generateDividerLabel } from "@/lib/utils";
import { Chat } from "@/types";
import UserAvatar from "@/components/miscellaneous/UserAvatar";
import useCurrentUser from "@/hooks/useCurrentUser";

interface ChatListItemProps{
  chat:Chat;
  currentlyOpened?:boolean;
}

const ChatListItem = ({ chat,currentlyOpened }: ChatListItemProps) => {

  const{currentUser}=useCurrentUser();

  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    navigate(`/chat/${chat._id}`);
  }, [chat, navigate]);

  const lastMessage = useMemo(() => {
    const lastMessage=chat.messages[chat.messages.length-1];
    if(lastMessage?.image){
      return "Sent an image"
    }
    if (lastMessage?.body) {
      if (lastMessage?.body.length <= 10) {
        return lastMessage?.body;
      }
      return `${lastMessage?.body.substring(0, 10)}`;
    }
    return null;
  }, [chat]);

  const lastMessageAt = useMemo(() => {
    const lastMessage=chat.messages[chat.messages.length-1];
    if (lastMessage?.createdAt) {
      return generateDividerLabel(new Date(lastMessage.createdAt))
    }
    return "";
  }, [chat]);


  const unreadMessages=useMemo(()=>{
    const messages=chat.messages;
    return messages.filter(({seenIds})=>{
      return !seenIds.includes(currentUser?._id)
    });
    
  },[chat.messages]);

  const isSeen = useMemo(() => {
    const lastMessage=chat.messages[chat.messages.length-1];
    return unreadMessages.includes(lastMessage);
  }, [chat.messages]);


  return (
    <div
      className={cn("w-full flex items-center gap-4 px-4 py-2.5 border-b cursor-pointer rounded-sm transition-all ease-in",!currentlyOpened && "hover:bg-muted/20" ,currentlyOpened && "bg-muted ",!currentlyOpened && "hover:bg-muted/20")}
      onClick={handleClick}
    >
      <UserAvatar imageUrl={chat.thumbnail || ""} className="dark:border-blue-400"/>
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-2 text-gray-800 font-semibold dark:text-gray-300">
          {chat?.name}
         {unreadMessages.length >0 && <p className="w-5 h-5  text-center bg-primary/20 p-0.5 rounded-full text-xs">{unreadMessages?.length}</p>}
        </div>
        <div className="w-full flex items-center justify-between">
          <span
            className={cn(
              "text-sm dark:text-gray-300",
              !isSeen
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
