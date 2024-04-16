import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema } from "@/components/forms/schemas";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import SendImage from "./SendImage";
import { sendMessage } from "@/api-client/message-api";
import { useTheme } from "../theme/ThemeProvider";
import { useSocketContext } from "@/context/SocketContext";

interface MessageFormProps {
  chatId: string;
}

const MessageForm = ({ chatId }: MessageFormProps) => {
  const { theme } = useTheme();
   // @ts-ignore
   const{socket}=useSocketContext();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const queryClient = useQueryClient();

  const { register, setValue, handleSubmit, watch } = useForm({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const message = watch("message");

  const { mutate, isLoading } = useMutation(sendMessage, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("getAllMessages");
      await queryClient.invalidateQueries("getAllChats");
      socket?.emit("new message", data);
    },
  });

  const addEmoji = (data: any) => {
    setValue("message", message + data.emoji);
  };

  const onImageSent=()=>{
    queryClient.invalidateQueries("getAllMessages");
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { message } = data;
    mutate({ chatId, message });
    setValue("message", "", { shouldValidate: true });
  };

  return (
    <div className="h-[10%] md:h-[12%] w-full px-2 py-1 flex items-center border-t relative">
      <form
        className="w-full flex-col md:flex-row items-center justify-between gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2 py-2">
          <SendImage chatId={chatId} trigger={ <CiImageOn className="h-8 w-8 text-primary cursor-pointer" />} onSent={onImageSent}/>
          <Popover
            open={showEmojiPicker}
            onOpenChange={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <PopoverTrigger>
              <BsEmojiSmile
                className="h-5 w-5 text-primary cursor-pointer"
               
              />
            </PopoverTrigger>
            <PopoverContent className="w-[380px] grid place-items-center">
              <EmojiPicker
                open={showEmojiPicker}
                onEmojiClick={addEmoji}
                height={390}
                theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
              />
            </PopoverContent>
          </Popover>
          <Input
            {...register("message")}
            disabled={isLoading}
            className="focus:outline-none focus:border-none"
          />
          <Button variant="secondary" className="border border-primary">
            <IoMdSend size={30} className="text-primary cursor-pointer" />
          </Button>
        </div>
      </form>
    </div>
  );
};
export default MessageForm;
