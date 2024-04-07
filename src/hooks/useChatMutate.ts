import {createChat as createChatApi, editGroupChat as editGroupChatApi} from "@/api-client/chat-api";
  import { useMutation } from "react-query";
  
  type ActionType = "create" | "edit";
  
  interface UseConnectionsProps<Action extends ActionType> {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    action: Action;
  }
  
  const useConnectionMutation = <Action extends ActionType>({
    action,
    onSuccess,
    onError,}: UseConnectionsProps<Action>) => {
    let apiFunction;
    switch (action) {
      case "create":
        apiFunction = createChatApi;
        break;
      case "edit":
        apiFunction = editGroupChatApi;
        break;
      default:
        throw new Error(`Invalid action type: ${action}`);
    }
  
    const {mutate,error, isLoading,isSuccess,} = useMutation(apiFunction, {
      onSuccess,
      onError,
    });

    const createChat = async (userId: string) => {
        console.log("userId from create chat",userId)
        const formData=new FormData();
        formData.append("name","sender");
        formData.append("isGroup","false");
        formData.append("userIds[0]", userId!);
        mutate(formData);
      };
      const createGroupChat = (name:string,members: string[],thumnail:File|null) => {
        const formData=new FormData();
        formData.append("name",name);
        formData.append("thumbnail",thumnail!);
        formData.append("isGroup","true");
        members?.forEach((member:any,index:number)=>{
          formData.append(`userIds[${index}]`,member?.value)
         });
        mutate(formData);
      };
      const editGroupChat = (name:string,members: string[],thumnail:File|null) => {
        const formData=new FormData();
        formData.append("name",name);
        formData.append("thumbnail",thumnail!);
        formData.append("isGroup","true");
        members?.forEach((member:any,index:number)=>{
          formData.append(`userIds[${index}]`,member?.value)
         });
        mutate(formData);
      };
  
    const performAction = (id: string) => {
      mutate(id);
    };
  
    return {
      performAction,
      error,
      isLoading,
      isSuccess
    };
  };
  
  export default useConnectionMutation;
  