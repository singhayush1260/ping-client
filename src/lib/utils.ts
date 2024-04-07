import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Coordinates {
  center:number[]
}

export const getUserLocation = (
  onSuccess: (location: Coordinates) => void,
  onError: (error: any) => void
): void => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSuccess({center:[latitude,longitude]});
      },
      (error) => {
        onError(error.message);
      }
    );
  } else {
    onError("Geolocation is not supported by your browser");
  }
};
