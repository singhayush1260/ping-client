import { logout } from "@/api-client/auth-api";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../ui/use-toast";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {

 
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate } = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
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
    console.log("logout button clicked")
    mutate();
  };

  return <div onClick={handleClick}>{children}</div>;
};
export default LogoutButton;
