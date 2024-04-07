import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  imageUrl: string|undefined;
  fallback?: string;
  className?:string;
}

const UserAvatar = ({ imageUrl,className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>
        <img src="/src/assets/avatar_placeholder.jpg"/>
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
