"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/action-tooltip";

type NavigationItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};

function NavigationItem({ id, imageUrl, name }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <li>
      <ActionTooltip side="right" align="center" label={name}>
        <button
          type="button"
          onClick={handleClick}
          className="relative flex items-center group">
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
              params?.serverId !== id
                ? "group-hover:h-[20px] h-[8px]"
                : "h-[36px]"
            )}
          />
          <div
            className={cn(
              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
              params?.serverId === id &&
                "bg-primary/10 text-primary rounded-[16px]"
            )}>
            <Image fill objectFit="cover" src={imageUrl} alt="Channel" />
          </div>
        </button>
      </ActionTooltip>
    </li>
  );
}

export default NavigationItem;
