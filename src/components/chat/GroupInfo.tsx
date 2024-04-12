import { useCallback,useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import useAllUsers from "@/hooks/useAllUsers";
import useUpdateGroup from "@/hooks/useUpdateGroup";
import { filter } from "lodash";
import { format } from "date-fns";
import { FieldValues, useForm } from "react-hook-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import ReactSelect from "react-select";
import UserAvatar from "@/components/miscellaneous/UserAvatar";
import Image from "@/components/miscellaneous/Image";
import ImageInputButton, {
  ImageType,
} from "@/components/miscellaneous/ImageInputButton";
import GROUP_THUMBNAIL_FALLBACK from "@/assets/group_thumbnnail_placeholder.png"
import { Chat } from "@/types";
import { IoIosSearch } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { CgMenuRight } from "react-icons/cg";
import { FcEditImage } from "react-icons/fc";
import { TbLoader2 } from "react-icons/tb";;
import AlertDialog from "../miscellaneous/AlertDialog";
import useChatMutate from "@/hooks/useChatMutate";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import useCurrentUser from "@/hooks/useCurrentUser";


interface Member {
  _id: string;
  name: string;
  isAdmin?: boolean;
}

interface GroupInfoProps {
  chat: Chat;
}

const GroupInfo = ({ chat }: GroupInfoProps) => {


  const { _id, name: groupName, thumbnail, createdAt, users,admin } = chat;

  const {currentUser}=useCurrentUser();

  const navigate = useNavigate();

  const { toast } = useToast();

  const queryClient = useQueryClient();


  const { otherUsers } = useAllUsers();

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
  const [members] = useState<Member[]>(initialMembers);
  const [searchResults, setSearchResults] = useState<Member[]>(members);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const[newMembers,setNewMembers]=useState<string[]>([]);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      groupName,
    },
  });

  const {
    mutateFunction: editName,
    isLoading: nameIsLoading,
  } = useUpdateGroup({
    action: "name",
    onSuccess: async () => {
      await queryClient.invalidateQueries("getChatById");
      await queryClient.invalidateQueries("getAllChats");
      setIsEditingName(false);
    },
    onError:()=>{toast({title:"Something went wrong.",description:"Could not update the name."})}
  });
  const {
    mutateFunction: changeThumbnail,
    isLoading: newThumbnailIsLoading,
  } = useUpdateGroup({
    action: "thumbnail",
    onSuccess: async () => {
      await queryClient.invalidateQueries("getChatById");
      await queryClient.invalidateQueries("getAllChats");
      setGroupThumbnail({ file: null, preview: null });
    },
    onError:()=>{toast({title:"Something went wrong.",description:"Could not update the group thumbnail."})}
  });

  const {
    mutateFunction: removeThumbnail,
    isLoading: removeThumbnailIsLoading,
  } = useUpdateGroup({
    action: "remove-thumbnail",
    onSuccess: async () => {
      await queryClient.invalidateQueries("getChatById");
      await queryClient.invalidateQueries("getAllChats");
    },
  });

  const {
    mutateFunction: addNewMembers,
    isLoading: addingNewMembers,
  } = useUpdateGroup({
    action: "add-members",
    onSuccess: async () => {
      await queryClient.invalidateQueries("getChatById");
      toast({title:"New members added."})
      setIsAddingUser(false);
    },
    onError:()=>{toast({title:"Something went wrong.",description:"Could not add new members."})}
  });
  const {
    mutateFunction: removeMember,
    isLoading: removingMember,
  } = useUpdateGroup({
    action: "remove-members",
    onSuccess: async () => {
      await queryClient.invalidateQueries("getChatById");
      toast({title:"Member removed."})
    },
    onError:()=>{toast({title:"Something went wrong.",description:"Error removing members."})}
  });

  const {
    mutateFunction: deleteChatById,
  } = useChatMutate({ action: "delete",onSuccess:()=>{
    navigate("/chats");
    toast({title:"Group deleted."})
  },onError:()=>{toast({title:"Something went wrong.",description:"Could not delete the group."})} });

  const notMembers = useMemo(() => {
    return otherUsers
      ?.filter((user) => {
        return !members?.some((member) => member._id === user._id);
      })
      .map((user) => {
        return { value: user._id, label: user.name };
      });
  }, [otherUsers, members]);

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

  const handleGroupDeletion = useCallback(() => {
    deleteChatById(_id);
  }, [deleteChatById, _id]);

  const handleEditName = useCallback(
    (data: FieldValues) => {
      editName({ chatId: _id, newName: data.groupName });
    },
    [isEditingName]
  );
  return (
    <div className="h-[350px] md:h-full pb-5 md:pb-0 px-4 md:px-0  grid grid-rows-10 gap-2">
      {/* {nameError && (
        <span className="text-sm text-red-500 font-light">
          {nameError?.message}
        </span>
      )} */}
      {!isEditingName && (
        <div className="row-span-1 flex items-center justify-between p-1">
          <div className="flex flex-col">
            <h5>{groupName} </h5>
            <small>created by { currentUser._id===admin?._id ? "You": admin?.name} </small>
            <small>{createdAtDate}</small>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CgMenuRight className="w-4 h-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuItem
                className="text-xs font-light text-gray-600 cursor-pointer"
                onClick={() => setIsEditingName(true)}
              >
                Edit Name
              </DropdownMenuItem>
             { currentUser._id===admin?._id && <DropdownMenuItem
                className="text-xs font-light text-gray-600 cursor-pointer"
                onClick={() => setIsAddingUser(true)}
              >
                Add Members
              </DropdownMenuItem>}
              <DropdownMenuItem className="text-xs font-light text-gray-600 cursor-pointer">
                Leave
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {isEditingName && (
        <div className="row-span-1 transition ease-in-out delay-150">
          <form
            className="flex justify-between gap-1"
            onSubmit={handleSubmit(handleEditName)}
          >
            <Input
              placeholder={groupName}
              {...register("groupName")}
              autoFocus
              className="mr-1"
            />
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
            fallback={GROUP_THUMBNAIL_FALLBACK}
            alt={groupName}
            className="w-[90px] h-[90px] rounded-full shadow-sm border object-scale-down"
          />
          <div className="absolute bottom-1  right-1 w-7 h-7 rounded-full flex items-center justify-center z-10 bg-white border p-2">
            <Popover>
              <PopoverTrigger>
                <FcEditImage size={20} />
              </PopoverTrigger>
              <PopoverContent className="w-20 p-1 space-y-1">
                {!groupThumbnail.preview && (
                  <>
                    <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                      Camera
                    </div>
                    <div className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black">
                      <ImageInputButton setImage={setGroupThumbnail}>
                        Browse
                      </ImageInputButton>
                    </div>
                    <div
                      className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black"
                      onClick={() => removeThumbnail({ chatId: _id })}
                    >
                      {removeThumbnailIsLoading ? "Removing.." : "Remove"}
                    </div>
                  </>
                )}
                {groupThumbnail.preview && (
                  <>
                    <div
                      className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black"
                      onClick={() =>
                        changeThumbnail({
                          chatId: _id,
                          newThumbnail: groupThumbnail.file,
                        })
                      }
                    >
                      {newThumbnailIsLoading ? "Saving.." : "Save"}
                    </div>
                    <div
                      className="text-sm font-light text-gray-600 p-0.5 rounded-sm cursor-pointer transition-colors hover:bg-zinc-100 dark:text-gray-300 hover:dark:text-black"
                      onClick={() =>
                        setGroupThumbnail({ file: null, preview: null })
                      }
                    >
                      Cancel
                    </div>
                  </>
                )}
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
                        <Label>{member._id===currentUser._id ? "You": member.name}</Label>
                       { member._id===admin?._id && <small className="bg-green-200 text-green-700 font-light text-xs py-0.5 px-1 rounded-md">admin</small>}
                      </div>
                      {member._id!==currentUser._id && <DropdownMenu>
                        <DropdownMenuTrigger>
                          <CiMenuKebab />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-10">
                        <DropdownMenuItem  className="text-xs font-light   cursor-pointer">
                            Message
                          </DropdownMenuItem>
                        { currentUser._id===admin?._id && <DropdownMenuItem  disabled={removingMember} className="text-xs font-light   cursor-pointer" onClick={()=>removeMember({chatId:_id,memberId:member._id})}>
                            {removingMember ? <TbLoader2 className="ml-5 animate-spin"/> :"Remove"}
                          </DropdownMenuItem>}
                        </DropdownMenuContent>
                      </DropdownMenu>}
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
              <fieldset disabled={addingNewMembers}>
              <ReactSelect
                options={notMembers}
                isMulti
                onChange={(user:any) =>setNewMembers(user) }
              />
              <div className="flex justify-center gap-2 mt-10">
                <Button variant="secondary" onClick={()=>addNewMembers({chatId:_id,newMembers})}>Add</Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsAddingUser(false)}
                >
                  Cancel
                </Button>
              </div>
              </fieldset>
            </form>
          </div>
        )}
      </div>
      <div className="row-span-1 flex px-4 md:px-0">
        <AlertDialog
          isDistructiveAction
          cancelButtonAction={() => {}}
          continueButtonAction={handleGroupDeletion}
          alertDiscription="This will permanently delete all your group chat data from our servers."
        >
          <Button variant="destructive" className="flex-grow">
            Delete
          </Button>
        </AlertDialog>
      </div>
    </div>
  );
};

export default GroupInfo;
