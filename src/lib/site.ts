const DEFAULT_SITE_URL = "https://yespstudio.com";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
