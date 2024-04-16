import { logout } from "@/api-client/auth-api";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TbLoader2 } from "react-icons/tb";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate, isLoading } = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      queryClient.removeQueries({ queryKey: "validateToken" });
    },
    onError: () => {
      toast({
        title: "Error logging out",
        description: "Something went wrong!",
      });
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <>
      <div onClick={handleClick}>{children ? children : "Logout"}</div>
      <Dialog open={isLoading}>
        {/* @ts-ignore */}
        <DialogContent hideCloseButton={true}
          className="flex flex-col items-center justify-center bg-transparent border-none shadow-none">
          <TbLoader2 className="w-10 h-10 text-gray-400 animate-spin" />
          <span className="text-lg text-gray-300">Logging out</span>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default LogoutButton;
