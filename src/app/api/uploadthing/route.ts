import { createNextRouteHandler } from "uploadthing/next";
import { utapi } from "uploadthing/server";

import { ourFileRouter } from "./core";
import { NextResponse } from "next/server";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(req: Request) {
  try {
    const { fileKey } = await req.json();

    const result = await utapi.deleteFiles(fileKey);
    return NextResponse.json(result);
  } catch (error) {
    console.log(["DELETE_IMAGE_UPLOADTHING"], error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
