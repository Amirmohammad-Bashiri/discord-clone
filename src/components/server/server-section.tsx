"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

import { type ServerWithMembersWithProfiles } from "@/types";
import ActionTooltip from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";

type ServerSectionProps = {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};

function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModalStore();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" ? (
        <ActionTooltip label="Create Channel" side="top">
          <button
            type="button"
            onClick={() => onOpen("createChannel", { channelType })}
            className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      ) : null}
      {role === MemberRole.ADMIN && sectionType === "members" ? (
        <ActionTooltip label="Manage Members" side="top">
          <button
            type="button"
            onClick={() => onOpen("members", { server })}
            className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
            <Settings className="w-4 h-4" />
          </button>
        </ActionTooltip>
      ) : null}
    </div>
  );
}

export default ServerSection;
