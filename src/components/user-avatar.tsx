import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  src?: string;
  styles?: string;
};

function UserAvatar({ src, styles }: UserAvatarProps) {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", styles)}>
      <AvatarImage src={src} />
    </Avatar>
  );
}

export default UserAvatar;
