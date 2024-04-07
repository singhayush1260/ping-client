import { cn } from "@/lib/utils";
import UserListSkeleton from "@/components/miscellaneous//UserListSkeleton";
import { Skeleton } from "../ui/skeleton";
import { BsEmojiSmile } from "react-icons/bs";
import { Input } from "../ui/input";
import { CiImageOn } from "react-icons/ci";
import { Button } from "../ui/button";
import { IoMdSend } from "react-icons/io";

interface ChatSkeletonLoaderProps {
  chatId: string;
}

const ChatSkeletonLoader = ({ chatId }: ChatSkeletonLoaderProps) => {
  return (
    <main
      className={cn("w-full md:w-[70%] md:block", chatId ? "block " : "hidden")}
    >
      <div className=" h-[12%] w-full flex justify-between items-center px-2 md:px-5 py-5 md:py-9 border-b">
        <UserListSkeleton />
      </div>
      <div className="relative h-[74.5%] p-2 flex flex-col gap-2 overflow-y-auto no-scrollbar light:bg-zinc-50">
        <Skeleton className="ml-auto h-8 w-[60%]" />
        <Skeleton className="ml-auto h-8 w-[50%]" />
        <Skeleton className="mr-auto h-8 w-[60%]" />
        <Skeleton className="mr-auto h-8 w-[40%]" />
        <Skeleton className="mr-auto h-8 w-[20%]" />
        <Skeleton className="ml-auto h-8 w-[60%]" />
        <Skeleton className="ml-auto h-8 w-[80%]" />
        <Skeleton className="ml-auto h-8 w-[50%]" />
        <Skeleton className="ml-auto h-8 w-[10%]" />
      </div>
      <div className="min-h-[12%] w-full px-2 py-1 flex items-center gap-2 border-t relative">
        <CiImageOn size={30} className="text-blue-600 cursor-pointer" />
        <BsEmojiSmile size={24} className="text-blue-600 cursor-pointer" />

        <Input className="focus:outline-none focus:border-none" disabled/>
        <Button variant="secondary">
          <IoMdSend size={30} className="text-gray-600 cursor-pointer" />
        </Button>
      </div>
    </main>
  );
};
export default ChatSkeletonLoader;
