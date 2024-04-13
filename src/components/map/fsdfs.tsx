import { useCallback,  useMemo } from "react";
import {  useNavigate } from "react-router-dom";
import useConnectionMutation from "@/hooks/useConnectionMutation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { format } from "date-fns";
import Image from "@/components/miscellaneous/Image";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
import { User } from "@/types";
import { Button } from "../ui/button";
import { IoPersonAdd } from "react-icons/io5";
import USER_FALLBACK from "@/assets/avatar_placeholder.jpg";
import useChatMutate from "@/hooks/useChatMutate";
interface MapPopupCardProps {
  user:User
}

const MapPopupCard = ({user}: MapPopupCardProps) => {

const{currentUser}=useCurrentUser();  

const navigate=useNavigate();

const{_id, name,email,profilePicture,about,location, createdAt: joinedAt}=user;

const { performAction:sendConnectionRequest, loading:sendingConnectionRequest,success:connectionRequestSent } = useConnectionMutation({
  action: "send",
  onSuccess: (data) => console.log("con req sent success!", data),
  onError: (error) => console.error("con req sent error!", error),
});


const{mutateFunction:createChat,data:createdChat}=useChatMutate({
  action:"create",
  onSuccess:(createdChat)=>{
    console.log("inside on success created chat",createdChat)
    navigate(`/chat/${createdChat?._id}`)
  }
})

console.log("created chat",createdChat);

const alreadyConnected=useMemo(()=>{
  return currentUser.connections?.some(user=>user._id===_id);
},[currentUser,user]);

const formattedJoinedDate = useMemo(() => format(new Date(joinedAt || ""), "PP"), [joinedAt]);

const handleMessageButtonClick=useCallback(()=>{
createChat(_id);
},[createChat,_id]);


// useEffect(() => {
//   if(createdChat?.chat?._id){
//     navigate(`/chat/${createdChat?.chat?._id}`)
//   }
// }, [createdChat]);

  return (
    <div className="flex flex-row md:flex-col items-center gap-2">
   
    <Image
        src={profilePicture}
        fallback={USER_FALLBACK}
        alt={`alt-${name}`}
        className="hidden md:block w-[70px] h-[70px] rounded-full shadow-sm object-scale-down border"
      />
      <div className="space-y-2 text-center">
        <h2 className="text-md">{name}</h2>
        {email && (
          <div className="text-gray-700 text-sm font-light">{email}</div>
        )}
         {about && (
          <div className="text-black italic text-sm font-normal text-wrap">{about}</div>
        )}
        {formattedJoinedDate && (
          <div className="text-sm font-medium text-wrap md:text-nowrap">
            Pinging since {formattedJoinedDate}
          </div>
        )}
       {
        location?.name &&  <div className="text-sm font-medium">
        From {location?.name}
      </div>
       }
      </div>
      <div className="w-full flex justify-center mt-5">
        {alreadyConnected &&   <Button onClick={handleMessageButtonClick} className="hidden md:block">  Message </Button>}
        {alreadyConnected &&   <Button onClick={handleMessageButtonClick} className="md:hidden"> <IoPersonAdd/></Button>}
        {!alreadyConnected &&  <LoaderButton label={(connectionRequestSent ?"Sent":"Connect")} isLoading={sendingConnectionRequest} loadingLabel="Sending Request"  className="flex-grow" onClick={()=>sendConnectionRequest(_id)}/> }
      </div>
    </div>
  );
};
export default MapPopupCard;
