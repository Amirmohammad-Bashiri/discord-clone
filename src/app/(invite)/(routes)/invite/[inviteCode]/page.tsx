import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

type InviteCodePageProps = {
  params: {
    inviteCode: string;
  };
};

async function InviteCodePage({ params }: InviteCodePageProps) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!params.inviteCode) return redirect("/");

  // Is user already a member of this server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  // Is the invitation code valid
  const isInviteCodeValid = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
  });

  if (isInviteCodeValid) {
    const server = await db.server.update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id,
            },
          ],
        },
      },
    });

    if (server) return redirect(`/servers/${server.id}`);
  } else {
    return redirect("/");
  }
}

export default InviteCodePage;
