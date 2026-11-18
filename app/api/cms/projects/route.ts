import { NextResponse } from "next/server";
import { getProjects } from "@/lib/cms/store";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

