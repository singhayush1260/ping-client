import { useMemo } from "react";
import { format } from "date-fns";
import Image from "./Image";
import LoaderButton from "./LoaderButton";
import USER_FALLBACK from "@/assets/avatar_placeholder.jpg"
import { User } from "@/types";

interface ProfileCardProps {
  name: string;
  email: string;
  profilePicture:string|undefined;
  about:string|undefined;
  location:{name:string,center:number[]}|undefined;
  connections:User[];
  joinedAt: Date;
  actionLabelOne?: string;
  actionOne?: () => void;
  actionOneIsLoading?:boolean;
  actionOneLoadingLabel?:string;
  actionLabelTwo?: string;
  actionTwo?: () => void;
  actionTwoIsLoading?:boolean;
  actionTwoLoadingLabel?:string;
}

const ProfileCard = ({
  name,
  email,
  profilePicture,
  about,
  location,
  connections,
  joinedAt,
  actionLabelOne,
  actionOne,
  actionOneIsLoading,
  actionOneLoadingLabel,
  actionLabelTwo,
  actionTwo,
  actionTwoIsLoading,
  actionTwoLoadingLabel
}: ProfileCardProps) => {

  
  const formattedJoinedDate = useMemo(() => format(new Date(joinedAt || ""), "PP"), [joinedAt]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={profilePicture}
        fallback={USER_FALLBACK}
        alt={`alt-name`}
        className="w-[100px] h-[100px] rounded-full shadow-sm object-scale-down border"
      />
      <div className="space-y-2 text-center">
        <h2 className="text-lg">{name}</h2>
        {email && (
          <div className="text-gray-700 text-sm font-light dark:text-gray-400">{email}</div>
        )}
         {about && (
          <div className="text-black italic text-sm font-normal dark:text-gray-200">{about}</div>
        )}
        {formattedJoinedDate && (
          <div className="text-sm font-medium">
            Pinging since {formattedJoinedDate}
          </div>
        )}
        {
          connections?.length >0 && <div className="text-xs p-0.5 bg-zinc-50 rounded-md dark:bg-muted">
           {connections.length} connections
        </div>
        }
       {
        location?.name &&  <div className="text-sm font-medium">
        From {location?.name}
      </div>
       }
      </div>
      <div className="w-full flex gap-3 mt-5">
        {actionLabelOne && actionOne && (
          <LoaderButton label={actionLabelOne} isLoading={actionOneIsLoading||false} loadingLabel={actionOneLoadingLabel} onClick={actionOne} className="flex-grow"/> 
        )}
        {actionLabelTwo && actionTwo && (
          <LoaderButton label={actionLabelTwo} isLoading={actionTwoIsLoading||false} loadingLabel={actionTwoLoadingLabel} onClick={actionTwo} className="flex-grow"/> 
        )}
      </div>
    </div>
  );
};
export default ProfileCard;
