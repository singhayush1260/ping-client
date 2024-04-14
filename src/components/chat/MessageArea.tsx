import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSocketContext } from "@/context/SocketContext";
import { getAllMessages } from "@/api-client/message-api";
//import { io } from "socket.io-client";
import { Message } from "@/types";
import { TiMessages } from "react-icons/ti";
import MessageItem from "./MessageItem";
import { generateDividerLabel } from "@/lib/utils";


//const API_URL = import.meta.env.VITE_API_BASE_URL;
//export let socket: any;

interface MessageAreaProps {
  chatId: string;
}
const MessageArea = ({ chatId }: MessageAreaProps) => {

  // @ts-ignore
  const{socket}=useSocketContext();

  console.log("socket from message area",socket) 

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
        scrollToBottom();
        setMessages(data);
      },
    }
  );

  useEffect(() => {
    //socket = io(API_URL);
    //socket.emit("mark online",currentUser?._id);
    socket?.emit("join room", chatId);
    refetch();
  }, [chatId]);

  useEffect(() => {
    socket?.on("message", (data: any) => {
      console.log("message event inside useEffect",data)
      const isMessageExists = messages.some(
        (message) => message._id === data._id
      );
      if (!isMessageExists) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });
    return () => {
      socket?.off("message");
    };
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length == 0) {
    return (
      <div className="h-[80.5%] md:h-[74.5%] w-full flex items-center justify-center p-2 overflow-y-auto  light:bg-zinc-50 bg-no-repeat bg-cover bg-center">
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
  let deviderLabel:string=generateDividerLabel(new Date(messages[0]?.createdAt));
  let currentDeviderLabel:string;
  let devider:any;
  return (
    <div className="h-[80.5%] md:h-[74.5%] w-full p-2 overflow-y-auto  light:bg-zinc-50 bg-no-repeat bg-cover bg-center">
      {messages.length >= 1 &&
        messages?.map((message: Message, index: number) => {
          if(index===0){
           devider= <div className="w-[120px] mx-auto italic text-xs text-gray-800 text-center my-6 px-4 py-0.5 rounded-sm bg-zinc-50">
                {deviderLabel}
              </div>
          }
         else{
          currentDeviderLabel=generateDividerLabel(new Date(message.createdAt));
          if(currentDeviderLabel===deviderLabel){
            devider=null;
          }
          else{
            devider= <div className="w-[120px] mx-auto italic text-xs text-gray-800 text-center my-6 px-4 py-0.5 rounded-sm bg-zinc-50">
                {deviderLabel}
              </div>
              deviderLabel=currentDeviderLabel;
          }
         }
         return (
          <>
           {devider}
            <MessageItem
              key={message._id}
              message={message}
              previousMessage={messages[index !== 0 ? index - 1 : 0]}
              lastMessage={index === messages.length - 1}
            />
          </>
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
// {isLoading && (
//   <div className="w-full h-full flex items-center justify-center">
//     <span className="animate-pulse text-lg">Loading your chats..</span>
//   </div>
// )}
