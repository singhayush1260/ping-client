import { editGroupChat as editGroupChatApi} from "@/api-client/chat-api";
  import { useMutation } from "react-query";
  
  type ActionType = "name" | "thumbnail" |"add-members"|"remove-members";
  
  interface UseEditGroupProps<Action extends ActionType> {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    action: Action;
  }
  
  const useEditGroup = <Action extends ActionType>({
    action,
    onSuccess,
    onError,}: UseEditGroupProps<Action>) => {

    const editName=(data:any)=>{
        console.log("edit name",data);
        const formData=new FormData();
        formData.append("chatId",data?.chatId)
        formData.append("newName",data?.newName);
        return formData;
    };
    const changeThumbnail=(data:any)=>{
        console.log("change thumbnail inside hook",data);
        const formData=new FormData();
        formData.append("chatId",data?.chatId)
        formData.append("newThumbnail",data?.newThumbnail!);
        return formData;
    };
    const addMembers=()=>{
        console.log("add members")
    };
    const removeMembers=()=>{
        console.log("remove members")
    };

    let mutateFunction:any;
    switch (action) {
      case "name":
        mutateFunction=editName;
        break;
      case "thumbnail":
        mutateFunction = changeThumbnail;
        break;
        case "add-members":
            mutateFunction = addMembers;
            break;
            case "remove-members":
                mutateFunction = removeMembers;
                break;
      default:
        throw new Error(`Invalid action type: ${action}`);
    }
  
    const {mutate,error, isLoading,isSuccess,} = useMutation(editGroupChatApi, {
      onSuccess,
      onError,
    });
  
    return {
        mutateFunction: (data: any) => mutate(mutateFunction(data)), 
        error,
        isLoading,
        isSuccess,
    };
  };
  
  export default useEditGroup;
  