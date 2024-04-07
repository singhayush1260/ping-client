import { useMemo, useEffect } from "react";
import { useSidebarContext } from "@/context/SidebarContext";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAllUsers from "@/hooks/useAllUsers";
import { useToast } from "../ui/use-toast";
import Map from "./Map";
import { User } from "@/types";

const UsersMap = () => {
  const { filter } = useSidebarContext();
  const { currentUser } = useCurrentUser();
  const { otherUsers } = useAllUsers();
  const { toast } = useToast();

  const filteredUsers = useMemo(() => {
    let users: User[] | undefined = [];
    if (filter.filterType === "ALL USERS") {
      users = otherUsers;
      console.log("inside all users filter");
    } else if (filter.filterType === "CONNECTIONS") {
      users = currentUser?.connections;
    } else if (filter.filterType === "ACTIVE CONNECTIONS") {
    } else {
      users = otherUsers?.filter((user) => {
        return user.location?.name === filter.filterPayload;
      });
    }
    return users;
  }, [filter, otherUsers]);

  useEffect(() => {
    if (filteredUsers?.length === 0) {
      if (filter.filterType === "CONNECTIONS") {
        toast({ title: "Zero users found." });
      } else if (filter.filterType === "CONNECTIONS") {
        toast({ title: "You have no connections." });
      } else if ((filter.filterType === "BY COUNTRY" && filter.filterPayload!==undefined)) {
        toast({ title: `No users found in ${filter.filterPayload}.`});
      }
    }
  }, [filteredUsers]);

  return (
    <div className="h-full w-full">
      <Map currentUser={currentUser} users={filteredUsers} />
    </div>
  );
};

export default UsersMap;
