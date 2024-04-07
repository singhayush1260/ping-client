import { useState } from "react";
import { useQuery } from "react-query";
import useConnectionMutation from "@/hooks/useConnectionMutation";
import { getConnectionRequests } from "@/api-client/con-req-api";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import UserAvatar from "@/components/miscellaneous/UserAvatar";
import UserListSkeleton from "@/components/miscellaneous/UserListSkeleton";
import Modal from "./Modal";
import { FaUserFriends } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";


interface ConnectionRequestProps {
  trigger?: React.ReactNode;
}

const ConnectionRequest = ({ trigger }: ConnectionRequestProps) => {


  const [requestType, setRequestType] = useState<"received" | "sent" | "">("received");

  const { data, isLoading, error, refetch } = useQuery(["getConnectionRequests", requestType], () => getConnectionRequests(requestType), {
    enabled: true
  });


  const { performAction: acceptRequest, loading: accepting, success: accepted, error: acceptingError } = useConnectionMutation({
    action: "accept",
  });

  const { performAction: declineRequest, loading: declining, success: declined, error: decliningError } = useConnectionMutation({
    action: "decline",
  });

  let body: JSX.Element[] | JSX.Element = [];

  if (data?.connectionRequests?.length === 0) {
    body = (
      <div className="h-[200px] flex flex-col items-center justify-center">
        <FaUserFriends className="w-8 h-8 text-blue-600" />
        <span className="text-gray-700 font-light">{
          requestType === "received" ? "No request received." : "No request sent."
        }</span>
      </div>
    );
  } else if (isLoading) {
    body = (
      <div className="h-[200px] flex flex-col items-center gap-2">
        <UserListSkeleton />
        <UserListSkeleton />
        <UserListSkeleton />
        <UserListSkeleton />
      </div>
    );
  } else {
    body = (
      <ScrollArea className="flex-grow max-h-[300px] overflow-y-auto">
        {data?.connectionRequests?.map((conReq: any) => {
          return (
            <div
              key={conReq?._id}
              className="flex items-center justify-between py-2 px-3 border-b shadow-sm rounded-sm hover:bg-zinc-50 hover:cursor-pointer"
            >
              <div className="flex gap-5">
                <UserAvatar imageUrl={requestType === "sent" ? conReq?.receiver?.profilePicture : conReq?.sender?.profilePicture} />
                <div className="flex flex-col">
                  <h5>{requestType === "sent" ? conReq?.receiver?.name : conReq?.sender?.name}</h5>
                  <small className="text-sm font-light text-gray-700">
                    {/* @ts-ignore */}
                    {formatDistanceToNow(new Date(conReq?.createdAt), { addSuffix: true })}
                  </small>
                 { !accepting && !declining && <small className={cn(conReq?.status === "accepted" ? "text-green-400" : "text-red-500")}>{conReq?.status.charAt(0).toUpperCase() + conReq.status.slice(1)}</small>}
                  {accepting && !declining && <small className="font-semibold text-blue-700">Accepting...</small>}
                  {/* {accepted && <small className="font-semibold text-green-400">Accepted</small>} */}
                  {declining && !accepting && <small className="font-semibold text-blue-700">Declining...</small>}
                  {/* {declined && <small className="font-semibold text-red-400">Declined</small>} */}
                </div>
              </div>

              {
                conReq.status === "pending" && requestType === "received" && <DropdownMenu>
                  <DropdownMenuTrigger>
                    <BsThreeDotsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-2 mr-[100px]">
                    <DropdownMenuItem
                      className={buttonVariants({ variant: "default" })}
                      onClick={() => acceptRequest(conReq)}
                    >
                      Accept
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={buttonVariants({ variant: "destructive" })}
                      onClick={() => declineRequest(conReq)}
                    >
                      Decline
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            </div>
          );
        })}
      </ScrollArea>
    );
  }

  return (
    <Modal trigger={trigger ? trigger : <span>Requests</span>} title="Connection Request">
      <Tabs defaultValue="received">
          <TabsList className="w-full">
            <TabsTrigger value="received" className="w-full" onClick={() => setRequestType("received")}>Received</TabsTrigger>
            <TabsTrigger value="sent" className="w-full" onClick={() => setRequestType("sent")}>Sent</TabsTrigger>
          </TabsList>
          <TabsContent value="received">
            {body}
          </TabsContent>
          <TabsContent value="sent">
            {body}
          </TabsContent>
        </Tabs>
    </Modal>
  );
};

export default ConnectionRequest;
