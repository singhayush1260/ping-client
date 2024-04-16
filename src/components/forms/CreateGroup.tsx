import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useChatMutate from "@/hooks/useChatMutate";
import useAllUsers from "@/hooks/useAllUsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FieldValues, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import Image from "@/components/miscellaneous/Image";
import ImageInputButton, { ImageType } from "@/components/miscellaneous/ImageInputButton";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
import { CreateGroupSchema } from "@/components/forms/schemas";
import { User } from "@/types";
import { FcEditImage } from "react-icons/fc";
import GROUP_THUMBNAIL_FALLBACK from "@/assets/group_thumbnnail_placeholder.png"


interface CreateGroupProps{
  setOpen:(value: boolean) => void
}

  const CreateGroup= ({setOpen}:CreateGroupProps) => {

    const [groupThumbnail, setGroupThumbnail] = useState<ImageType>({
      file: null,
      preview: null,
    });

    const{otherUsers}=useAllUsers();

    const navigate=useNavigate();

    const{mutateFunction:createGroupChat,isLoading:creatingChat,isSuccess:chatCreated,error:creatingChatError}=useChatMutate({
      action:"create-group",
      onSuccess:(createdGroup)=>{
          setOpen(false);
          navigate(`/chat/${createdGroup?._id}`);
      }
    })
    const{register,handleSubmit,setValue, watch,formState:{errors}}=useForm({
      resolver:zodResolver(CreateGroupSchema)
    });

    const usersList = useMemo(() => {
      return otherUsers?.map((user:User) => ({ value: user._id, label: user.name }));
    }, [otherUsers]);

    const members=watch("members");

    const onSubmit=useCallback((data:FieldValues)=>{
     createGroupChat({...data,thumbnail:groupThumbnail.file});
    },[createGroupChat,members]);

    return (
        <form className="flex flex-col items-center gap-2 px-1 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
        <Image src={ groupThumbnail.preview ||""}
          fallback={GROUP_THUMBNAIL_FALLBACK}
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
            </PopoverContent>
          </Popover>
              </div>
            </div>
            <div className="w-full space-y-2">
            <Label>Group Name</Label>
            <Input placeholder="Friends" {...register("name")} disabled={creatingChat}/>
            { errors?.name?.message && <span className="text-sm font-light text-red-600">{String(errors?.name?.message)}</span>}
          </div>
          
          <div className="w-full space-y-2">
            <Label>Members</Label>
            <ReactSelect 
            isDisabled={creatingChat}
            styles={{option: (provided, state) => ({
              ...provided,
              color: state.isSelected ? 'white' : 'blue',
              padding: 5,
            })}}
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
  