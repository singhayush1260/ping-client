import { IoCheckmark, IoCheckmarkDoneOutline } from "react-icons/io5";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
//import { socket } from "./MessageArea";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { markAsSeen } from "@/api-client/message-api";
import useCurrentUser from "@/hooks/useCurrentUser";

interface MessageItemProps {
  message: any;
  lastMessage?: boolean;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const { currentUser } = useCurrentUser();
  const [seenIds, setSeenIds] = useState(message?.seenIds);
  //console.log("messgae from message item", message);
  const sender = message.sender;
  const isSent = currentUser?._id === (sender?._id || sender);
  const classes = isSent
    ? `bg-blue-600 text-white rounded-md p-1.5 w-[60%] mb-2 ml-auto`
    : `bg-white text-gray-700 shadow-sm rounded-md p-1.5 w-[60%] mb-2 mr-auto`;

  const { mutate } = useMutation(markAsSeen, {
    onSuccess: (message) => {
      // socket.emit("mark as seen",message)
    },
  });

  const isSeen = useMemo(() => {
    if (message?.chat?.isGroup) {
      return message?.chat?.users?.length === seenIds?.length;
    }
    return seenIds?.length === 2;
  }, [message, seenIds]);

  const sentAt = useMemo(() => {
    if (message?.createdAt) {
      //@ts-ignore
      return formatDistanceToNow(new Date(message?.createdAt), {
        addSuffix: true,
      });
    }
    return "";
  }, [message]);

  useEffect(() => {
    if (!message?.seenIds.includes(currentUser?._id)) {
      mutate(message?._id);
    }
    //   if(socket){
    //     socket.on("seen",(data:any)=>{
    //       setSeenIds(data.seenIds);
    //   })
    //   }
  }, [message]);

  if (message.image) {
    return (
        <div className={classes}>
        <div className="w-[200px] h-[150px] bg-blue-400 shadow-md">
          <img
            src={message.image}
            className="block h-full w-full max-w-full max-h-full object-scale-down"
          />
        </div>
        <div className="font-light">{message.body}</div>
      </div>
    );
  }

  return (
    <div className={classes}>
      {/* {!isSent && <span className="text-base font-medium">{"ayush"}</span>} */}
      <div className="font-light flex justify-between">
        <p>{message.body}</p>
        <div className="flex items-center gap-4">
          <small>{sentAt}</small>
          {isSent && (
            <small className="mt-2.5">
              {" "}
              {isSeen ? <IoCheckmarkDoneOutline /> : <IoCheckmark />}{" "}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
