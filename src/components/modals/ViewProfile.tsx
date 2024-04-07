import ProfileCard from "@/components/miscellaneous/ProfileCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Skeleton } from "../ui/skeleton";
import { BiMessageError } from "react-icons/bi";
import Modal from "./Modal";

interface ViewProfileProps {
  trigger?: React.ReactNode;
}

const ViewProfile = ({ trigger }: ViewProfileProps) => {
  const { currentUser, isLoading, isError } = useCurrentUser();

 let body: JSX.Element[] | JSX.Element = [];

  if (currentUser) {
    body = (
      <ProfileCard
        name={currentUser.name}
        email={currentUser.email}
        profilePicture={currentUser?.profilePicture}
        about={currentUser.about}
        joinedAt={currentUser.createdAt}
        location={currentUser.location}
      />
    );
  } 
  if (isLoading) {
    body = (
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="w-[100px] h-[100px] rounded-full shadow-sm" />
        <Skeleton className="w-[150px] h-7 shadow-sm" />
        <Skeleton className="w-[200px] h-4 shadow-sm" />
        <Skeleton className="w-[250px] h-5 shadow-sm" />
        <Skeleton className="w-[150px] h-4 shadow-sm" />
      </div>
    );
  } 
  if(isError) {
    body = (
      <div className="flex flex-col items-center gap-2">
        <BiMessageError className="w-12 h-12 text-red-600" />
        <span className="font-medium text-gray-800">Oops!</span>
        <span className="text-sm font-light text-gray-600">
          Something went wrong!
        </span>
      </div>
    );
  }

  return (
    <Modal trigger={trigger ? trigger : <span>Profile</span>} title="Your Profile">
      {body}
    </Modal>
  );
};

export default ViewProfile;
