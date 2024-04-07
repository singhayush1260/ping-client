import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import useAllUsers from "@/hooks/useAllUsers";
import useEditGroup from "@/hooks/useEditGroup";
import { filter } from "lodash";
import { format } from "date-fns";
import { FieldValues, useForm } from "react-hook-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import ReactSelect from "react-select";
import UserAvatar from "@/components/miscellaneous/UserAvatar";
import Image from "@/components/miscellaneous/Image";
import ImageInputButton, { ImageType } from "@/components/miscellaneous/ImageInputButton";
import USER_FALLBACK from "@/assets/avatar_placeholder.jpg";
import { Chat } from "@/types";
import { IoIosSearch } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { CgMenuRight } from "react-icons/cg";
import { FcEditImage } from "react-icons/fc";


interface Member {
  _id: string;
  name: string;
  isAdmin?: boolean;
}

interface GroupInfoProps {
  chat: Chat;
}

const GroupInfo = ({ chat }: GroupInfoProps) => {

  const queryClient=useQueryClient();

  const { _id, name: groupName, thumbnail, createdAt, users } = chat;

  const{otherUsers}=useAllUsers();

  const initialMembers = useMemo(() => {
    return users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
      };
    });
  }, [users, chat]);

  const [groupThumbnail, setGroupThumbnail] = useState<ImageType>({
    file: null,
    preview: null,
  });
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchResults, setSearchResults] = useState<Member[]>(members);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const{register,handleSubmit,formState:{errors}}=useForm({
    defaultValues:{
      groupName
    }
  });


  const {mutateFunction:editName,isLoading:nameIsLoading,error:nameError,isSuccess:nameSuccess}=useEditGroup({
    action:"name",
    onSuccess:async()=>{
      await queryClient.invalidateQueries("getChatById")
      await queryClient.invalidateQueries("getAllChats")
      setIsEditingName(false)
      console.log("name changed");
    }
  })
  const {mutateFunction:changeThumbnail,isLoading:newThumbnailIsLoading,error:newThumbnailError,isSuccess:newThumbnailSuccess}=useEditGroup({
    action:"thumbnail",
    onSuccess:async()=>{
      await queryClient.invalidateQueries("getChatById")
      await queryClient.invalidateQueries("getAllChats")
      setGroupThumbnail({file:null,preview:null})
      console.log("thumbnail changed");
    }
  })
 
 
  const notMembers=useMemo(()=>{
    return otherUsers?.filter((user) => {
      return !members?.some((member) => member._id === user._id)
    }).map((user) => {
      return { value: user._id, label: user.name };
    });
   },[otherUsers,members]);

  const createdAtDate = useMemo(() => {
    return format(new Date(createdAt), "PP");
  }, [createdAt, chat]);

  const handleMemberSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      const result = filter(members, (member: Member) =>
        member.name.toLowerCase().includes(query)
      );
      setSearchResults(result);
    },
    [members]
  );

  const handleEditName = async (data:FieldValues) => {
     console.log("data from handleEditName",data)
     editName({chatId: _id,newName:data.groupName});
  };

  return (
    <div className="h-[350px] md:h-full pb-5 md:pb-0 px-4 md:px-0  grid grid-rows-10 gap-2">
      {nameError && <span className="text-sm text-red-500 font-light">{nameError?.message}</span>}
      {!isEditingName && (
        <div className="row-span-1 flex items-center justify-between p-1">
          <div className="flex flex-col">
            <h5>{groupName} </h5>
            <small>created at: {createdAtDate}</small>
          </div>
          <Popover>
            <PopoverTrigger>
              <CgMenuRight className="w-4 h-4 text-gray-500" />
            </PopoverTrigger>
            <PopoverContent className="w-22 p-1 space-y-1 mr-5">
              <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black" onClick={()=>setIsEditingName(true)}>
                Edit Name
              </div>
              <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black" onClick={()=>setIsAddingUser(true)}>
               Add Members
              </div>
              <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                Leave
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      {isEditingName &&  (
        <div className="row-span-1 transition ease-in-out delay-150">
          <form className="flex justify-between gap-1" onSubmit={handleSubmit(handleEditName)}>
            <Input placeholder={groupName} {...register("groupName")} autoFocus className="mr-1" />
            <Button
              type="button"
              variant="destructive"
              disabled={nameIsLoading}
              onClick={() => setIsEditingName(false)}
            >
              <RxCross1 className="w-3 h-3" />{" "}
            </Button>
            <Button variant="outline">
              <FaCheck className="w-3 h-3" />
            </Button>
          </form>
          
        </div>
      )}
      <div className="row-span-2 grid place-items-center py-2">
        <div className="relative">
          <Image
            src={groupThumbnail.preview || thumbnail}
            fallback={USER_FALLBACK}
            alt={groupName}
            className="w-[90px] h-[90px] rounded-full shadow-sm border object-scale-down"
          />
          <div className="absolute bottom-1  right-1 w-7 h-7 rounded-full flex items-center justify-center z-10 bg-white border p-2">
            <Popover>
              <PopoverTrigger>
                <FcEditImage size={20} />
              </PopoverTrigger>
              <PopoverContent className="w-20 p-1 space-y-1">
               {
                !groupThumbnail.preview && <>
                 <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                  Camera
                </div>
                <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                  <ImageInputButton setImage={setGroupThumbnail}>
                    Browse
                  </ImageInputButton>
                </div>
                <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                  Remove
                </div>
                </>
               }
                {
                groupThumbnail.preview && <>
                 <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black" onClick={()=>changeThumbnail({chatId:_id,newThumbnail:groupThumbnail.file})}>
                  {newThumbnailIsLoading ?"Saving.." :"Save"}
                </div>
                <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black" onClick={()=>setGroupThumbnail({file:null,preview:null})}>
                  Cancel
                </div>
                </>
               }
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="row-span-6 flex flex-col">
        {!isAddingUser && (
          <>
            <Collapsible className="flex flex-col gap-2 p-2">
              <div className="flex justify-between items-center">
                <small className="font-semibold">{users.length} members</small>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setSearchResults(members)}
                  >
                    <IoIosSearch />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <Input
                  className="h-7"
                  placeholder="Search member..."
                  onChange={handleMemberSearch}
                  autoFocus
                />
              </CollapsibleContent>
            </Collapsible>
            <ScrollArea className="flex-grow max-h-[250px] overflow-y-auto p-2">
              {searchResults.length >= 1 ? (
                searchResults.map((member) => {
                  return (
                    <div
                      key={member._id}
                      className="flex items-center justify-between mb-2 p-2 cursor-pointer rounded-sm hover:bg-gray-50 hover:dark:bg-blue-300"
                    >
                      <div className="flex items-center gap-2">
                        <UserAvatar imageUrl="" fallback={member.name} />
                        <Label>{member.name}</Label>
                      </div>
                      <Popover>
                        <PopoverTrigger>
                          <CiMenuKebab />
                        </PopoverTrigger>
                        <PopoverContent className="w-20 p-1 space-y-1 mr-5">
                          <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                            Message
                          </div>
                          <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                            Remove
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  );
                })
              ) : (
                <small className="m-auto">No member found.</small>
              )}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </>
        )}
        {isAddingUser && (
          <div className="md:mt-5 mt-10">
            <form>
              <ReactSelect options={notMembers} isMulti onChange={(value)=>console.log("members",value)}/>
              <div className="flex justify-center gap-2 mt-10">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsAddingUser(false)}
                >
                  Cancel
                </Button>
                <Button variant="secondary">Add</Button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="row-span-1 flex gap-2 px-4 md:px-0">
        <Button variant="destructive" className="flex-grow">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default GroupInfo;
