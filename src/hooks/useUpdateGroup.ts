import { updateGroupChat as updateGroupChatApi } from "@/api-client/chat-api";
import { useMutation } from "react-query";

type ActionType =
  | "name"
  | "thumbnail"
  | "remove-thumbnail"
  | "add-members"
  | "remove-members";

interface UseUpdateGroupProps<Action extends ActionType> {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  action: Action;
}

const useUpdateGroup = <Action extends ActionType>({
  action,
  onSuccess,
  onError,
}: UseUpdateGroupProps<Action>) => {
  const editName = (data: any) => {
    const formData = new FormData();
    formData.append("chatId", data?.chatId);
    formData.append("newName", data?.newName);
    return formData;
  };
  const changeThumbnail = (data: any) => {
    const formData = new FormData();
    formData.append("chatId", data?.chatId);
    formData.append("newThumbnail", data?.newThumbnail!);
    return formData;
  };
  const removeThumbnail = (data: any) => {
    const formData = new FormData();
    formData.append("chatId", data?.chatId);
    formData.append("removeThumbnail", JSON.stringify(true));
    return formData;
  };
  const addMembers = (data:any) => {
    const formData=new FormData();
    formData.append("chatId",data?.chatId);
    data.newMembers?.forEach((member:any,index:number)=>{
      formData.append(`newMembers[${index}]`,member?.value)
     });
   return formData;
  };
  const removeMembers = (data:any) => {
    const formData=new FormData();
    formData.append("chatId",data?.chatId);
    formData.append("memberId", data.memberId!);
   return formData;
  };

  let mutateFunction: any;
  switch (action) {
    case "name":
      mutateFunction = editName;
      break;
    case "thumbnail":
      mutateFunction = changeThumbnail;
      break;
    case "remove-thumbnail":
      mutateFunction = removeThumbnail;
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

  const { mutate, error, isLoading, isSuccess } = useMutation(
    updateGroupChatApi,
    {
      onSuccess,
      onError,
    }
  );

  return {
    mutateFunction: (data: any) => mutate(mutateFunction(data)),
    error,
    isLoading,
    isSuccess,
  };
};

export default useUpdateGroup;
