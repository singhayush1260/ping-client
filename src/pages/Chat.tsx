import Sidebar from "@/components/sidebar/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageArea from "@/components/chat/MessageArea";
import MessageForm from "@/components/chat/MessageForm";
import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import useChatQuery from "@/hooks/useChatQuery";
import ChatSkeletonLoader from "@/components/chat/ChatSkeletonLoader";
import { BiError } from "react-icons/bi";
import { buttonVariants } from "@/components/ui/button";

const Chat = () => {
  const params = useParams();
  const chatId = params?.chatId ? params?.chatId : "";
  const { chat, gettingChatByIdError: error } = useChatQuery(chatId);

  console.log("chat from chatId",chat);

  return (
    <div className="h-full flex">
      <div className={cn("w-[30%] md:block", chatId ? "hidden" : "block")}>
        <Sidebar defaultValue="chats" />
      </div>
      {chat && !error && (
        <main
          className={cn(
            "w-full md:w-[70%] md:block",
            chatId ? "block" : "hidden"
          )}
        >
          <ChatHeader chat={chat} />
          <MessageArea chatId={chat._id} />
          <MessageForm chatId={chat._id} />
        </main>
      )}
      {error && (
        <main
          className={cn(
            "w-full h-full md:w-[70%] flex items-center justify-center",
            chatId ? "flex" : "hidden"
          )}
        >
          <div className=" py-4 px-8  rounded-sm flex flex-col items-center gap-1">
            <BiError className="w-10 h-10 text-red-500"/>
            <h1 className="font-medium">404 Error</h1>
            <h1 className="font-light text-gray-700 mb-5">Sorry, chat not found.</h1>
            <Link to="/chats" className={buttonVariants({variant:"default"})}>Back to chats</Link>
          </div>
        </main>
      )}
      {!chat && !error && <ChatSkeletonLoader chatId={chatId} />}
    </div>
  );
};

export default Chat;
