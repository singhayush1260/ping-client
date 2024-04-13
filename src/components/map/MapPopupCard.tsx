import { useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useConnectionMutation from "@/hooks/useConnectionMutation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/types";
import useChatMutate from "@/hooks/useChatMutate";
import ProfileCard from "../miscellaneous/ProfileCard";
import { getConnectionRequests } from "@/api-client/con-req-api";
import { useToast } from "../ui/use-toast";
interface MapPopupCardProps {
  user: User;
}

const MapPopupCard = ({ user }: MapPopupCardProps) => {
  
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
  
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const{toast}=useToast();

  const { data,refetch} = useQuery("getConnectionRequests", () => getConnectionRequests(""), {
    enabled: true
  });

  const {
    performAction: sendConnectionRequest,
    loading: sendingConnectionRequest,
  } = useConnectionMutation({
    action: "send",
    onSuccess: () => toast({title:"Connection request sent."}),
    onError: () => toast({title:"Error sending connection request."}),
  });

  const { performAction: acceptRequest, loading: acceptingConnectionRequest} = useConnectionMutation({
    action: "accept",
  });

  const { mutateFunction: createChat,isLoading:creatingChat} = useChatMutate({
    action: "create",
    onSuccess: (createdChat) => {
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
     if(req?.status==="Accepted"){
       return {
         label:"Message",
         isLoading:creatingChat,
         isLoadingLabel:"Wait",
         action:()=>createChat(_id)
       }
     }
     else if(req?.status==="Pending"){
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
