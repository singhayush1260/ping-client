import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
const SecuritySettings=()=>{

  const editProfilePictureMenu = [
    {
      label: "Camera",
      onClick: () => {
        console.log("camera");
      },
    },
    {
      label: "Gallery",
      onClick: () => {
        console.log("gallery");
      },
    },
    {
      label: "Remove",
      onClick: () => {
        console.log("remove dp");
      },
    },
  ];

  return(
    <form className="flex flex-col items-center gap-4">
        <div className="space-y-1 w-full">
        <Label>Current Password</Label>
        <Input type="password" placeholder="Enter current password"/>
        </div>
        <div className="space-y-1 w-full">
        <Label>New Password</Label>
        <Input type="password" placeholder="Enter new password"/>
        </div>
        <div className="w-full flex justify-end">
         <LoaderButton label="Save" isLoading={false} loadingLabel="Saving"/>
        </div>
    </form>
  )
}

export default SecuritySettings;