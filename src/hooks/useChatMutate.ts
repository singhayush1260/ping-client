import { createChat as createChatApi, deleteChatById as deleteChatByIdApi,leaveGroup as leaveGroupApi } from "@/api-client/chat-api";
import { useMutation } from "react-query";

type ActionType =
  | "create"
  | "create-group"
  | "delete"
  | "leave-group"

interface UseChatMutate<Action extends ActionType> {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  action: Action;
}

const useChatMutate = <Action extends ActionType>({
  action,
  onSuccess,
  onError,
}: UseChatMutate<Action>) => {
  const createChat =  (userId: string) => {
    console.log("userId from create chat hook",userId)
    const formData=new FormData();
    formData.append("name","sender");
    formData.append("isGroup","false");
    formData.append("userIds[0]", userId!);
    return formData;
  };
  const createGroupChat = (data:any) => {
    console.log("create group from create chat hook",data)
    const formData=new FormData();
    formData.append("name",data?.name);
    formData.append("thumbnail",data?.thumbnail!);
    formData.append("isGroup","true");
    data.members?.forEach((member:any,index:number)=>{
      formData.append(`userIds[${index}]`,member?.value)
     });
   return formData;
  };
  const deleteChat = (chatId: string) => {
    console.log("chat id from delete chat",chatId)
    return chatId;
  };
  const leaveGroup = (chatId: string) => {
    console.log("chat id from leave group",chatId)
    return chatId;
  };
  let apiFunction:any;
  let mutateFunction: any;
  switch (action) {
    case "create":
      apiFunction=createChatApi;
      mutateFunction = createChat;
      break;
    case "create-group":
      apiFunction=createChatApi;
      mutateFunction = createGroupChat;
      break;
    case "delete":
      apiFunction=deleteChatByIdApi
      mutateFunction = deleteChat;
      break;
    case "leave-group":
      apiFunction=leaveGroupApi
      mutateFunction=leaveGroup
      break;
    default:
      throw new Error(`Invalid action type: ${action}`);
  }

  const {data, mutate, error, isLoading, isSuccess,isError } = useMutation(
    apiFunction,
    {
      onSuccess,
      onError,
    }
  );

  return {
    data,
    mutateFunction: (data: any) => mutate(mutateFunction(data)),
    error,
    isLoading,
    isSuccess,
    isError
    
  };
};

export default useChatMutate;
