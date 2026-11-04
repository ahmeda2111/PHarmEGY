const PRODUCTION_SITE_URL = "https://pharmegy.vercel.app";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (typeof window !== "undefined") {
    const { origin, hostname } = window.location;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      return origin;
    }
  }

  return PRODUCTION_SITE_URL;
}

export function getAuthRedirectUrl() {
  return `${getSiteUrl()}/auth/callback`;
}
