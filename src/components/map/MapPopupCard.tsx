import { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { createChat as createChatApi } from "@/api-client/chat-api";
import { useNavigate } from "react-router-dom";
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
import ProfileCard from "../miscellaneous/ProfileCard";
import Modal from "../modals/Modal";
import { getConnectionRequests } from "@/api-client/con-req-api";
interface MapPopupCardProps {
  user: User;
}

const MapPopupCard = ({ user }: MapPopupCardProps) => {
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const {
    _id,
    name,
    email,
    profilePicture,
    about,
    connections,
    location,
    createdAt: joinedAt,
  } = user;

  const { data,refetch} = useQuery("getConnectionRequests", () => getConnectionRequests(""), {
    enabled: true
  });

 

  const {
    performAction: sendConnectionRequest,
    loading: sendingConnectionRequest,
  } = useConnectionMutation({
    action: "send",
    onSuccess: (data) => console.log("con req sent success!", data),
    onError: (error) => console.error("con req sent error!", error),
  });

  const { performAction: acceptRequest, loading: acceptingConnectionRequest} = useConnectionMutation({
    action: "accept",
  });

  const { mutateFunction: createChat,isLoading:creatingChat} = useChatMutate({
    action: "create",
    onSuccess: (createdChat) => {
      console.log("inside on success created chat", createdChat);
      navigate(`/chat/${createdChat?._id}`);
    },
  });


   // returns the status of the request between current user and _id, if not present it returns undefined
  
   const cardAction=useMemo(()=>{
    refetch();
    const req= data?.connectionRequests?.filter((conReq:any)=>{
     const {receiver,sender}=conReq;
      return ( currentUser._id===sender._id  && _id===receiver._id) || ( currentUser._id===receiver._id && _id===sender._id) 
     })[0];
     console.log("status",req?.status);
     if(req?.status==="Accepted"){
       return {
         label:"Message",
         isLoading:creatingChat,
         isLoadingLabel:"Wait",
         action:()=>createChat(_id)
       }
     }
     else if(req?.status==="Pending"){
      console.log("pending",req);
      if(currentUser._id===req?.receiver._id){
        return {
         label:"Accept",
         isLoading:acceptingConnectionRequest,
         isLoadingLabel:"Accepting",
          action:()=>acceptRequest(req)
        } 
      }
       return {
         label:"Sent",
         action:()=>{}
       }
     }
     return {
       label:"Connect",
       isLoading:sendingConnectionRequest,
       isLoadingLabel:"Sending",
       action:()=>sendConnectionRequest(_id)
     };
   },[data,createChat,creatingChat,acceptRequest,acceptingConnectionRequest,sendConnectionRequest,sendingConnectionRequest]);

   console.log("card action",cardAction)

  return (
    <div className="flex flex-col items-center gap-2">
      <ProfileCard
        name={name}
        email={email}
        profilePicture={profilePicture}
        location={location}
        about={about}
        connections={connections||[]}
        joinedAt={joinedAt}
        actionLabelOne={cardAction.label}
        actionOne={cardAction.action}
        actionOneIsLoading={creatingChat || sendingConnectionRequest||acceptingConnectionRequest}
      />
    </div>
  );
};
export default MapPopupCard;
