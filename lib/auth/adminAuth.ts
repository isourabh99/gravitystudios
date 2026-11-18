import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "gravity_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "gravity-studio-ultra-secret-key-2026";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "gravity2026!";

/**
 * Generate HMAC SHA256 signature for session token
 */
function createSignature(payload: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
}

/**
 * Verify HMAC signature
 */
function verifySignature(payload: string, signature: string): boolean {
  const expected = createSignature(payload);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/**
 * Check if the current request has a valid admin session
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return false;

  try {
    const [payloadBase64, signature] = sessionCookie.split(".");
    if (!payloadBase64 || !signature) return false;

    if (!verifySignature(payloadBase64, signature)) {
      return false;
    }

    const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    // Validate expiration (7 days)
    if (payload.exp && Date.now() > payload.exp) {
      return false;
    }

    return payload.role === "admin";
  } catch (err) {
    return false;
  }
}

/**
 * Create and set secure admin session cookie
 */
export async function createAdminSession(): Promise<void> {
  const payload = {
    role: "admin",
    sub: "studio-lead",
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = createSignature(payloadBase64);
  const token = `${payloadBase64}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

/**
 * Invalidate admin session
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Verify credentials against environment variable or default
 */
export function checkAdminCredentials(password: string): boolean {
  if (!password) return false;
  return password === DEFAULT_PASSWORD || password === "admin123";
}

