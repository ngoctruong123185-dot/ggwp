import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE_NAME = "hihsk_token";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "hihsk-local-secret-key-32-bytes-secure-random!"
);

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  role: string;
}

export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.id || !payload.username) return null;
    return {
      id: payload.id as string,
      username: payload.username as string,
      displayName: (payload.displayName as string) || (payload.username as string),
      role: (payload.role as string) || "USER",
    };
  } catch {
    return null;
  }
}
