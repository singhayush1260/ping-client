import useConnectionMutation from "@/hooks/useConnectionMutation";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/miscellaneous/UserAvatar";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ConnectionRequestItemProps {
  connectionRequest: any;
  requestType: "received" | "sent" | "";
}

const ConnectionRequestItem = ({
  connectionRequest,
  requestType,
}: ConnectionRequestItemProps) => {
  const {
    performAction: acceptRequest,
    loading: accepting,
    success: accepted,
  } = useConnectionMutation({
    action: "accept",
  });

  const {
    performAction: declineRequest,
    loading: declining,
    success: declined,
  } = useConnectionMutation({
    action: "decline",
  });
  return (
    <div className="flex items-center justify-between py-2 px-3 border-b shadow-sm rounded-sm hover:bg-zinc-50 hover:cursor-pointer">
      <div className="flex gap-5">
        <UserAvatar
          imageUrl={
            requestType === "sent"
              ? connectionRequest?.receiver?.profilePicture
              : connectionRequest?.sender?.profilePicture
          }
        />
        <div className="flex flex-col">
          <h5>
            {requestType === "sent"
              ? connectionRequest?.receiver?.name
              : connectionRequest?.sender?.name}
          </h5>
          <small className="text-sm font-light text-gray-700">
            {/* @ts-ignore */}
            {formatDistanceToNow(new Date(connectionRequest?.createdAt), {
              addSuffix: true,
            })}
          </small>
          {!accepting && !declining && !accepted && !declined && (
            <small
              className={cn(
                connectionRequest?.status === "Accepted"
                  ? "text-green-400"
                  : "text-red-500"
              )}
            >
              {connectionRequest?.status}
            </small>
          )}
          {accepting && !declining && (
            <small className="font-semibold text-blue-700">Accepting...</small>
          )}
          {accepted && (
            <small className="font-semibold text-green-400">Accepted</small>
          )}
          {declining && !accepting && !declined && (
            <small className="font-semibold text-blue-700">Declining...</small>
          )}
          {declined && (
            <small className="font-semibold text-red-400">Declined</small>
          )}
        </div>
      </div>

      {connectionRequest.status === "Pending" && requestType === "received" && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2 mr-[100px]">
            <DropdownMenuItem onClick={() => acceptRequest(connectionRequest)}>
              Accept
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => declineRequest(connectionRequest)}>
              Decline
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
export default ConnectionRequestItem;
