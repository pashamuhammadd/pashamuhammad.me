import { NextResponse } from "next/server";
import { getGitHubActivity } from "@/lib/github-activity";

export async function GET() {
  const result = await getGitHubActivity();
  return NextResponse.json(result);
}
