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

export const generateDeviderLabel=(date: Date): string=> {
  const nowIST = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }); 
  const nowISTDate = new Date(nowIST); 
  const diffTime = Math.abs(nowISTDate.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekIndex: number = date.getDay();
    const dayOfWeek: string = daysOfWeek[dayOfWeekIndex];
    return dayOfWeek;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', { ...options, timeZone: 'Asia/Kolkata' });
  }
}