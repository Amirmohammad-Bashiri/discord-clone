import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import ServerHeader from "./server-header";

type ServerSidebarProps = {
  serverId: string;
};

const ServerSidebar = async function ({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile();

  if (!profile) return redirect;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    channel => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    channel => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    channel => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    member => member.profileId !== profile.id
  );

  const role = server?.members.find(
    member => member.profileId === profile.id
  )?.role;

  if (!server) return redirect("/");

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
} as unknown as (props: ServerSidebarProps) => JSX.Element;

export default ServerSidebar;
