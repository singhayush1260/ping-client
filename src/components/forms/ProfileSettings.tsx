import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation,useQueryClient } from "react-query";
import { ProfileSettingSchema } from "./schemas";
import ImageInputButton from "@/components/miscellaneous/ImageInputButton";
import Image from "@/components/miscellaneous/Image";
import { FcEditImage } from "react-icons/fc";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
import { ImageType } from "@/components/miscellaneous/ImageInputButton";
import { cn } from "@/lib/utils";
import { updateUser } from "@/api-client/user-api";
import useCurrentUser from "@/hooks/useCurrentUser";
import { zodResolver } from "@hookform/resolvers/zod";
import USER_FALLBACK from "@/assets/avatar_placeholder.jpg"


const ProfileSettings = () => {

  const queryClient=useQueryClient();

  const { currentUser } = useCurrentUser();

  //const[removeProfilePicture,setRemoveProfilePicture]=useState(false);

  const [profilePicture, setProfilePicture] = useState<ImageType>({
    file: null,
    preview: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver:zodResolver(ProfileSettingSchema)
  });

  const { mutate, isLoading, error,isSuccess } = useMutation(updateUser, {
    onSuccess: async (updatedUser) => {
      console.log("updated user", updatedUser);
      await queryClient.invalidateQueries("getCurrentUser");
    },
    onError: () => {
      console.log("Error updating user");
    },
  });

  const name=watch("name");
  const about=watch("about");

  const removeProfilePicture=useCallback(()=>{
    console.log("rm pp");
    const formData = new FormData();
    formData.append("removeProfilePicture",JSON.stringify(true));
    mutate(formData);
    console.log("pp rmvd");
  },[mutate]);

  const onSubmit=useCallback((data:FieldValues)=>{
    const a=4/0;
    console.log("onSubmit data",data,a);
      const formData = new FormData();
        if (profilePicture?.file) {
          formData.append("profilePicture", profilePicture.file);
        }
        if(data?.name?.length>0){
          formData.append("name", data.name);
        }
        if(data?.about?.length>0){
          formData.append("about", data.about);
        }
        console.log("name",formData.get("name"));
        console.log("about",formData.get("about"));
        mutate(formData);
    
  },[profilePicture,name,about,mutate]);

  console.log("error from profle setting",error)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-col items-center gap-2 w-full" disabled={isLoading}>
      <div className="relative" title="Max image allowed is 1MB">
        <Image
          src={
            profilePicture.preview ||
            currentUser?.profilePicture
          }
          fallback={USER_FALLBACK}
          className={cn(
            errors?.image?.message && "border-4 border-red-600",
            "w-[100px] h-[100px] rounded-full border object-scale-down"
          )}
        />
        <div className="absolute bottom-1  right-1 w-7 h-7 rounded-full flex items-center justify-center z-10 bg-white border p-2">
          <Popover>
            <PopoverTrigger>
              <FcEditImage size={20} />
            </PopoverTrigger>
            <PopoverContent className="w-20 p-1 space-y-1">
              <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100">
                Camera
              </div>
              <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100">
                <ImageInputButton setImage={setProfilePicture}>
                  Browse
                </ImageInputButton>
              </div>
              <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100" onClick={()=>removeProfilePicture()}>
                {isLoading ? "Removing..":"Remove"}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="w-full space-y-1">
        <Label>Name</Label>
        <Input placeholder={currentUser?.name} {...register("name")} />
        {errors?.name?.message && (
          <span className="text-sm font-light text-red-600">
            {String(errors?.name?.message)}
          </span>
        )}
      </div>
      <div className="w-full space-y-1">
        <Label>About</Label>
        <Input placeholder={currentUser?.about} {...register("about")} />
        {errors?.about?.message && (
          <span className="text-sm font-light text-red-600">
            {String(errors?.about?.message)}
          </span>
        )}
      </div>

      <div className="w-full flex items-center justify-between">
        {isSuccess && <span className="text-sm font-light text-green-500">Saved Successfully</span>}
        {/* @ts-ignore */}
        <span className="text-sm font-light text-red-500">{error?.message}</span>
        <LoaderButton
          label="Save"
          isLoading={isLoading}
          loadingLabel="Saving"
        />
      </div>
      </fieldset>
    </form>
  );
};

export default ProfileSettings;
