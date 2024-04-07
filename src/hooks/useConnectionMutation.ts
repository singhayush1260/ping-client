import {
  sendConnectionRequest as sendConnectionRequestApi,
  acceptConnectionRequest as acceptConnectionRequestApi,
  declineConnectionRequest as declineConnectionRequestApi,
} from "@/api-client/con-req-api";
import { useMutation } from "react-query";

type ActionType = "send" | "accept" | "decline";

interface UseConnectionsProps<Action extends ActionType> {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  action: Action;
}

const useConnectionMutation = <Action extends ActionType>({
  action,
  onSuccess,
  onError,
  
}: UseConnectionsProps<Action>) => {
  let apiFunction;
  switch (action) {
    case "send":
      apiFunction = sendConnectionRequestApi;
      break;
    case "accept":
      apiFunction = acceptConnectionRequestApi;
      break;
    case "decline":
      apiFunction = declineConnectionRequestApi;
      break;
    default:
      throw new Error(`Invalid action type: ${action}`);
  }

  const {
    mutate: mutation,
    error: connectionRequestError,
    isLoading: loading,
    isSuccess: success,
  } = useMutation(apiFunction, {
    onSuccess,
    onError,
  });

  const performAction = (id: string) => {
    mutation(id);
  };

  return {
    performAction,
    loading,
    success,
    error: connectionRequestError,
  };
};

export default useConnectionMutation;
