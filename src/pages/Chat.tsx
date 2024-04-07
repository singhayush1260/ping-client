import Sidebar from "@/components/sidebar/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageArea from "@/components/chat/MessageArea";
import MessageForm from "@/components/chat/MessageForm";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import useChatQuery from "@/hooks/useChatQuery";
import ChatSkeletonLoader from "@/components/chat/ChatSkeletonLoader";

const Chat = () => {
  const params = useParams();
  const chatId = params?.chatId ? params?.chatId : "";
  const { chat, gettingChatByIdError: error } = useChatQuery(chatId);

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
            "w-full md:w-[70%] md:flex items-center justify-center",
            chatId ? "block" : "hidden"
          )}
        >
          <span className="text-lg">No chat found.</span>
        </main>
      )}
      {!chat && !error && <ChatSkeletonLoader chatId={chatId} />}
    </div>
  );
};

export default Chat;
