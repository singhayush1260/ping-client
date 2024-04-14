import { useState } from "react";
import { useQuery } from "react-query";
import { getConnectionRequests } from "@/api-client/con-req-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import UserListSkeleton from "@/components/miscellaneous/UserListSkeleton";
import Modal from "./Modal";
import { FaUserFriends } from "react-icons/fa";
import ConnectionRequestItem from "./ConnectionRequestItem";


interface ConnectionRequestProps {
  trigger?: React.ReactNode;
}

const ConnectionRequest = ({ trigger }: ConnectionRequestProps) => {


  const [requestType, setRequestType] = useState<"received" | "sent" | "">("received");

  const { data, isLoading } = useQuery(["getConnectionRequests", requestType], () => getConnectionRequests(requestType), {
    enabled: true
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
      <ScrollArea className="flex-grow max-h-[300px] overflow-y-auto space-y-1">
        {data?.connectionRequests?.map((conReq: any) => {
          return (
            <ConnectionRequestItem key={conReq._id} requestType={requestType} connectionRequest={conReq}/>
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
