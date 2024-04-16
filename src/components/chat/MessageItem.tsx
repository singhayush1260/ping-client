import { IoCheckmark, IoCheckmarkDoneOutline } from "react-icons/io5";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { markAsSeen } from "@/api-client/message-api";
import useCurrentUser from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { useSocketContext } from "@/context/SocketContext";
import Image from "../miscellaneous/Image";
import IMAGE_FALLBACK from "@/assets/image_fallback.png";

interface MessageItemProps {
  message: Message;
  previousMessage: Message;
  lastMessage?: boolean;
}

const MessageItem = ({ message, previousMessage }: MessageItemProps) => {
  const { currentUser } = useCurrentUser();
  const [seenIds, setSeenIds] = useState(message?.seenIds);
  const [showMore, setShowMore] = useState(false);
  // @ts-ignore
  const { socket } = useSocketContext();
  const sender = message.sender;
  const isSent = currentUser?._id === (sender?._id || sender);

  const { mutate } = useMutation(markAsSeen, {
    onSuccess: (message) => {
      socket?.emit("mark as seen", message);
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
      return (
        format(new Date(message?.createdAt), "hh:mm") +
        " " +
        format(new Date(message?.createdAt), "a")
      );
      // return formatDistanceToNow(new Date(message?.createdAt), {
      //   addSuffix: true,
      // });
    }
    return "";
  }, [message]);

  useEffect(() => {
    if (!message?.seenIds.includes(currentUser?._id)) {
      mutate(message?._id);
    }
    if (socket) {
      socket.on("seen", (data: any) => {
        setSeenIds(data.seenIds);
      });
    }
  }, [message]);
  if (message.image) {
    return (
      <div className={cn("w-[60%] mb-2", isSent ? "ml-auto" : "mr-auto")}>
        {!isSent &&
          message?.chat?.isGroup &&
          previousMessage.sender?._id !== message.sender?._id && (
            <span className="text-sm font-medium">{message?.sender?.name}</span>
          )}
        <div
          className={cn(
            "font-normal flex flex-col  p-1 rounded-md shadow-md ",
            isSent
              ? "bg-blue-500 dark:bg-blue-800 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-30 text-white"
              : "bg-muted  dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-30 text-gray-700 dark:text-white"
          )}
        >
          <div className="w-[200px] h-[150px] bg-blue-400 dark:bg-blue-800 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-30 shadow-md">
            <Image
              src={message.image}
              fallback={IMAGE_FALLBACK}
              className="block h-full w-full max-w-full max-h-full object-scale-down"
            />
          </div>
          <div
            className={cn(
              "font-normal flex p-1 rounded-md shadow-md ",
              isSent
                ? "bg-blue-500 dark:bg-blue-800 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-30 text-white"
                : "bg-muted  dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-30 text-gray-700 dark:text-white"
            )}
          >
            {!showMore && (
              <p className="w-[80%] flex flex-col">
                {message?.body?.length! > 110
                  ? message.body?.slice(1, 110)
                  : message.body}{" "}
                {message?.body?.length! > 110 && (
                  <small
                    className=" text-gray-300 text-sm font-light italic underline cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </small>
                )}{" "}
              </p>
            )}
            {showMore && (
              <p className="w-[80%] flex flex-col">
                {message?.body}{" "}
                {message?.body?.length! > 110 && (
                  <small
                    className=" text-gray-300 text-sm font-light italic underline cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </small>
                )}{" "}
              </p>
            )}
            <div className="w-[20%] flex flex-col justify-end">
              <div className="flex justify-end items-center gap-2">
                <small>
                  {sentAt.charAt(0) === "0" ? sentAt.slice(1) : sentAt}
                </small>
                {isSent && (
                  <small className="mt-2">
                    {" "}
                    {isSeen ? <IoCheckmarkDoneOutline /> : <IoCheckmark />}{" "}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-[60%] mb-2", isSent ? "ml-auto" : "mr-auto")}>
      {!isSent &&
        message?.chat?.isGroup &&
        previousMessage.sender?._id !== message.sender?._id && (
          <span className="text-sm font-medium">{message?.sender?.name}</span>
        )}
      <div
        className={cn(
          "font-normal flex p-1 rounded-md shadow-md ",
          isSent
            ? "bg-blue-500 dark:bg-blue-800 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-30 text-white"
            : "bg-muted  dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-30 text-gray-700 dark:text-white"
        )}
      >
        {!showMore && (
          <p className="w-[80%] flex flex-col">
            {message?.body?.length! > 110
              ? message.body?.slice(1, 110)
              : message.body}{" "}
            {message?.body?.length! > 110 && (
              <small
                className=" text-gray-300 text-sm font-light italic underline cursor-pointer"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Show More"}
              </small>
            )}{" "}
          </p>
        )}
        {showMore && (
          <p className="w-[80%] flex flex-col">
            {message?.body}{" "}
            {message?.body?.length! > 110 && (
              <small
                className=" text-gray-300 text-sm font-light italic underline cursor-pointer"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Show More"}
              </small>
            )}{" "}
          </p>
        )}
        <div className="w-[20%] flex flex-col justify-end">
          <div className="flex justify-end items-center gap-2">
            <small>{sentAt.charAt(0) === "0" ? sentAt.slice(1) : sentAt}</small>
            {isSent && (
              <small className="mt-2">
                {" "}
                {isSeen ? <IoCheckmarkDoneOutline /> : <IoCheckmark />}{" "}
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
