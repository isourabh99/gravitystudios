import { NextResponse } from "next/server";
import { getBrandingSettings, getThemeSettings } from "@/lib/cms/store";

export async function GET() {
  try {
    const [branding, theme] = await Promise.all([
      getBrandingSettings(),
      getThemeSettings(),
    ]);

    return NextResponse.json({
      success: true,
      branding,
      theme,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

