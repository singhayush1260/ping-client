import { createChat as createChatApi } from "@/api-client/chat-api";
import { useMutation } from "react-query";

const useChatMutation = () => {
  const {
    data:createdChat,
    mutate: createChatMutate,
    isLoading: creatingChat,
    error: creatingChatError,
    isSuccess: chatCreated,
  } = useMutation(createChatApi);


  const createChat = async (userId: string) => {
    console.log("userId from create chat",userId)
    const formData=new FormData();
    formData.append("name","sender");
    formData.append("isGroup","false");
    formData.append("userIds[0]", userId!);
    createChatMutate(formData);
  };
  const createGroupChat = (name:string,members: string[],thumnail:File|null) => {
    const formData=new FormData();
    formData.append("name",name);
    formData.append("thumbnail",thumnail!);
    formData.append("isGroup","true");
    members?.forEach((member:any,index:number)=>{
      formData.append(`userIds[${index}]`,member?.value)
     });
    createChatMutate(formData);
  };
  return {
    createChat,
    createGroupChat,
    createdChat,
    creatingChat,
    creatingChatError,
    chatCreated,
  };
};
export default useChatMutation;
