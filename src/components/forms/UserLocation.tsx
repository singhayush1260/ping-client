import CountrySelect from "../miscellaneous/CountrySelect";
import { useCallback, useState } from "react";
import Map from "../map/Map";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "@/api-client/user-api";
import useCurrentUser from "@/hooks/useCurrentUser";

export type Location = {
  name: string;
  center: number[];
};

const UserLocation = () => {
  const queryClient = useQueryClient();

  const { currentUser } = useCurrentUser();
  let updatedUserWithLocation = currentUser;

  const [location, setLocation] = useState<Location | undefined>(
    currentUser?.location || { name: "", center: [] }
  );

  updatedUserWithLocation.location = location;

  const { mutate, isLoading, error, isSuccess } = useMutation(updateUser, {
    onSuccess: async (updatedUser) => {
      console.log("updated user after location update", updatedUser);
      await queryClient.invalidateQueries("getCurrentUser");
    },
    onError: () => {
      console.log("error updating location");
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (location) {
        const formData = new FormData();
        formData.append("location", JSON.stringify(location));
        mutate(formData);
      }
    },
    [location]
  );
  return (
    <form className="w-full h-full space-y-1" onSubmit={handleSubmit}>
      <div className="w-full space-y-1">
        <CountrySelect
          onChange={(value) => {
            setLocation({ name: value.label, center: value.latlng });
          }}
        />
      </div>
      {!location?.name && (
        <div className="relative w-full h-[200px] grid place-items-center rounded-sm border">
          <div className="mt-5 ml-10 text-gray-600 font-light">
            You have not yet set your location.
          </div>
        </div>
      )}
      {location?.name && (
        <div className="relative w-full h-[200px]  rounded-sm border">
          <Map currentUser={updatedUserWithLocation} />
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        {isSuccess && (
          <span className="text-sm font-light text-green-500">
            Location saved
          </span>
        )}
        <span className="text-sm font-light text-red-500">
          {/* @ts-ignore */}
          {error?.message}
        </span>
        <LoaderButton
          label="Save"
          isLoading={isLoading}
          loadingLabel="Saving"
        />
      </div>
    </form>
  );
};
export default UserLocation;
