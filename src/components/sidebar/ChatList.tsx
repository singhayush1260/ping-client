import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useChatQuery from "@/hooks/useChatQuery";
import UserListSkeleton from "@/components/miscellaneous/UserListSkeleton";
import ChatListItem from "./ChatListItem";
import { Chat } from "@/types";
import { Button } from "../ui/button";
import { MdOutlineGroupAdd } from "react-icons/md";
import CreateChat from "../modals/CreateChat";
import { PiChatsFill } from "react-icons/pi";
import { BiMessageError } from "react-icons/bi";



const ChatList = () => {

  const params = useParams();
  const chatId = params?.chatId ? params?.chatId : "";
  
  const{getAllChats,chats,isLoadingAllChats,gettingAllChatsError}=useChatQuery();

   useEffect(()=>{
    getAllChats();
   },[])
  if (chats?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center mt-16">
          <PiChatsFill className="w-12 h-12 text-blue-600" />
          <span className="font-medium text-gray-800">No chat exists yet</span>
          <span className="text-sm font-light text-gray-600">
            Click users to start conversation
          </span>
        </div>
        <CreateChat trigger={<div className="absolute bottom-10 right-6 bg-blue-600 text-white flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-blue-600">
          <MdOutlineGroupAdd className="h-5 w-5" />
        </div>}/>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {gettingAllChatsError && (
        <div className="flex flex-col items-center mt-16">
          <BiMessageError className="w-12 h-12 text-red-600" />
          <span className="font-medium text-gray-800">Oops!</span>
          <span className="text-sm font-light text-gray-600">
            Something went wrong!
          </span>
          <Button variant="outline" className="mt-5">
            Retry
          </Button>
        </div>
      )}
      {isLoadingAllChats &&
        Array.from({ length: 4 }).map((_, idx) => {
          return <UserListSkeleton key={idx.toString()} />;
        })}
      {!gettingAllChatsError &&
        chats?.map((chat: Chat) => {
          return <ChatListItem key={chat._id} chat={chat} currentlyOpened={chat._id===chatId} />;
        })}
      <CreateChat trigger={<div className="absolute bottom-10 right-6 bg-blue-600 text-white flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-blue-600">
          <MdOutlineGroupAdd className="h-5 w-5" />
        </div>}/>
    </div>
  );
};
export default ChatList;
