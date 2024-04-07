import UserListSkeleton from "@/components/miscellaneous/UserListSkeleton";
import { BiMessageError } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { Chat } from "@/types";
import { Button } from "../ui/button";
import ChatListItem from "./ChatListItem";

const CallList = () => {
  

 const chats:any=[];
 const error=null;
 const isLoading=false;

  if (chats?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center mt-16">
          <IoCall className="w-10 h-10 text-blue-600" />
          <span className="font-medium text-gray-800 dark:text-white">No call history</span>
          <span className="text-sm font-light text-gray-600 dark:text-white">
            You haven't called anyone yet.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-2 overflow-y-auto">
      {error && (
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
      {isLoading &&
        Array.from({ length: 4 }).map((_, idx) => {
          return <UserListSkeleton key={idx.toString()} />;
        })}
      {!error &&
        chats?.map((chat: Chat) => {
          return <ChatListItem key={chat._id} chat={chat} />;
        })}
    </div>
  );
};
export default CallList;
