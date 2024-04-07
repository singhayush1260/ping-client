import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getAllMessages } from "@/api-client/message-api";
import { Message } from "@/types";
import { TiMessages } from "react-icons/ti";
import MessageItem from "./MessageItem";

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface MessageAreaProps {
  chatId: string;
}
const MessageArea = ({ chatId }: MessageAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const latestMessageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { isLoading, refetch } = useQuery(
    ["getAllMessages", chatId],
    () => getAllMessages(chatId),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log("message area success");
        scrollToBottom();
        setMessages(data);
      },
    }
  );

  useEffect(() => {
    // socket = io(API_URL);
    // socket.emit("join room", chatId);
    refetch();
  }, []);

  if (messages.length == 0) {
    return (
      <div className="h-[74.5%] w-full flex items-center justify-center p-2 overflow-y-auto  light:bg-zinc-50 bg-no-repeat bg-cover bg-center">
        <div className="w-full h-full flex items-center justify-center my-[15%]">
          <div className="flex flex-col items-center light:bg-zinc-50 p-2 md:p-5 animate-bounce">
            <TiMessages className="w-7 h-7 md:w-10 md:h-10 text-blue-700" />
            <div className="font-bold text-sm md:text-lg">No messages, yet</div>
            <div className="text-sm font-light text-gray-600 dark:text-gray-100">
              Start a conversation now
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[74.5%] w-full p-2 overflow-y-auto  light:bg-zinc-50 bg-no-repeat bg-cover bg-center">
      {messages.length >= 1 &&
        messages?.map((message: Message, index: number) => {
          return (
            <MessageItem
              key={message._id}
              message={message}
              lastMessage={index === messages.length - 1}
            />
          );
        })}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="animate-pulse text-lg">Loading your chats..</span>
        </div>
      )}

      <div ref={latestMessageRef} className="pt-5" />
    </div>
  );
};
export default MessageArea;
