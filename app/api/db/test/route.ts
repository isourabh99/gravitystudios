import { NextResponse } from "next/server";
import { testMongoConnection } from "@/lib/db/mongodb";

export async function GET() {
  const result = await testMongoConnection();
  return NextResponse.json(result);
}

