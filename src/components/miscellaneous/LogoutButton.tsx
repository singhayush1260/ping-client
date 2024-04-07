import { logout } from "@/api-client/auth-api";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../ui/use-toast";

// import useCurrentUser from "@/hooks/useCurrentUser";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  // const { removeCurrentUser } = useCurrentUser();

  const { toast } = useToast();



  const { mutate, isLoading } = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      // removeCurrentUser();
    },
    onError: () => {
      toast({
        title: "Error logging out",
        description: "Something went wrong!",
      });
      console.log("Error loggin out");
    },
  });

  const handleClick = () => {
    mutate();
  };

  return <div onClick={handleClick}>{children}</div>;
};
export default LogoutButton;
