import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactSelect from "react-select";
import Image from "@/components/miscellaneous/Image";
import { FcEditImage } from "react-icons/fc";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FieldValues, useForm } from "react-hook-form";
import { CreateGroupSchema } from "@/components/forms/schemas";
import { useCallback, useMemo, useState } from "react";
import ImageInputButton, { ImageType } from "@/components/miscellaneous/ImageInputButton";
import { cn } from "@/lib/utils";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
import useChatMutation from "@/hooks/useChatMutation";
import useAllUsers from "@/hooks/useAllUsers";
import { User } from "@/types";
import USER_FALLBACK from "@/assets/avatar_placeholder.jpg"
  
interface CreateGroupProps{
    
}


  const CreateGroup= ({ }:CreateGroupProps) => {

    const [groupThumbnail, setGroupThumbnail] = useState<ImageType>({
      file: null,
      preview: null,
    });

    const{otherUsers}=useAllUsers();

    const{createGroupChat,chatCreated,creatingChat,creatingChatError}=useChatMutation();
  
    const{register,handleSubmit,setValue, watch,formState:{errors}}=useForm({
      resolver:zodResolver(CreateGroupSchema)
    });

    const usersList = useMemo(() => {
      return otherUsers?.map((user:User) => ({ value: user._id, label: user.name }));
    }, [otherUsers]);

    const members=watch("members");

    const onSubmit=useCallback((data:FieldValues)=>{
     createGroupChat(data.name,data.members,groupThumbnail.file);
     console.log("create grup chat data",data,groupThumbnail);
    },[createGroupChat,members]);

    return (
        <form className="flex flex-col items-center gap-2 px-1 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
        <Image src={ groupThumbnail.preview ||""}
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
                <ImageInputButton setImage={setGroupThumbnail}>
                  Browse
                </ImageInputButton>
              </div>
              <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100">
                Remove
              </div>
            </PopoverContent>
          </Popover>
              </div>
            </div>
            <div className="w-full space-y-2">
            <Label>Group Name</Label>
            <Input placeholder="Friends" {...register("name")}/>
            { errors?.name?.message && <span className="text-sm font-light text-red-600">{String(errors?.name?.message)}</span>}
          </div>
          
          <div className="w-full space-y-2">
            <Label>Members</Label>
            <ReactSelect 
             classNames={{
              control:()=>"border-2",
              input:()=>"text-lg",
              option:()=>"text-lg"
            }}
            theme={(theme)=>({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: 'black',
                primary25: '#ffe4e6'
              }
            })}
            options={usersList}
            isMulti 
            onChange={(value)=>setValue("members",value)}
            />
            { errors?.members && <span className="text-sm font-light text-red-600">{String(errors?.members?.message)}</span>}
          </div>
          <div className="w-full flex items-center justify-between">
        {chatCreated && <span className="text-sm font-light text-green-500">Created Successfully</span>}
        {/* @ts-ignore */}
        <span className="text-sm font-light text-red-500">{creatingChatError?.message}</span>
        <LoaderButton
          label="Create"
          isLoading={creatingChat}
          loadingLabel="Creating"
        />
      </div>
        </form>
    );
  };
  export default CreateGroup;
  