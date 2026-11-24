import { NextResponse, type NextRequest } from "next/server";
import { getGitHubActivity } from "@/lib/github-activity";

// ?scope=public returns public activity only, fetched without the token.
export async function GET(request: NextRequest) {
  const publicOnly = request.nextUrl.searchParams.get("scope") === "public";
  const result = await getGitHubActivity({ publicOnly });
  return NextResponse.json(result);
}
