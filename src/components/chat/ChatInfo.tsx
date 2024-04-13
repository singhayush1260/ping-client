import { useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { IoIosCall } from "react-icons/io";
import { FcVideoCall } from "react-icons/fc";
import Image from "@/components/miscellaneous//Image";
import { Chat, User } from "@/types";
import {format} from "date-fns";
import USER_FALLBACK from "@/assets/avatar_placeholder.jpg"
import useChatMutate from "@/hooks/useChatMutate";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../miscellaneous/AlertDialog";

interface ChatInfoProps {
  chat: Chat;
}

const ChatInfo = ({chat }: ChatInfoProps) => {
 const { users } = chat;
 console.log("chat from caht info",chat)
 const otherUser:User=users[0];

 const navigate=useNavigate();

 const { mutateFunction: deleteChatById} = useChatMutate({
  action: "delete",
  onSuccess: () => {
    console.log("chat deleted success");
    navigate(`/chats`);
  },
});
 
 const joinedDate=useMemo(()=>{
  return format(new Date(otherUser.createdAt),"PP");
 },[otherUser.createdAt,format]);

 const handleChatDeletion = useCallback(() => {
  deleteChatById(chat._id);
}, [deleteChatById, chat._id]);

  return (
    <div className="h-[350px] md:h-full pb-5 md:pb-0 px-4 md:px-0 pt-10 md:pt-0  grid grid-rows-10 gap-2">
    <div className="row-span-5 flex flex-col items-center justify-center gap-1 pb-2 rounded-sm">
    <Image
         src={otherUser.profilePicture}
         fallback={USER_FALLBACK}
         alt={otherUser.name}
         className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full border object-scale-down"
       />
       <h4>{otherUser.name}</h4>
       <small> pinging since {joinedDate}</small>
       <div className="flex gap-2"> 
         <Button variant="outline">
             <IoIosCall className="text-blue-400"/>
         </Button>
         <Button variant="outline">
             <FcVideoCall/>
         </Button>
       </div>
    </div>
   
    <div className="row-span-4 text-wrap p-2 shadow-sm rounded-sm">
     <h6 className="font-semibold">About</h6>
     <p className="font-light text-gray-800 dark:text-gray-300 text-sm">
       {otherUser.about ? otherUser.about : `Hello, I am ${otherUser.name}`}
     </p>
    </div>
    {/* <div className="row-span-3 px-2 shadow-sm bg-white rounded-sm">
     <small className="font-semibold">2 groups in common</small>
     <ScrollArea>
         <ScrollBar orientation="vertical"/>
     </ScrollArea>
    </div> */}
    <div className="row-span-1 flex gap-2">
     {/* <Button variant="outline" className="flex-grow gap-2 text-red-500">
         <MdBlock/>
         Block</Button> */}
      <AlertDialog
          isDistructiveAction
          cancelButtonAction={() => {}}
          continueButtonAction={handleChatDeletion}
          alertDiscription="This will permanently delete all your group chat data from our servers."
        >
          <Button variant="destructive" className="flex-grow">
            Delete
          </Button>
        </AlertDialog>
</div>
 </div>
  )
};

export default ChatInfo;
