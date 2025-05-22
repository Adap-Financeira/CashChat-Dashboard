export function getCookie(rawCookie: string) {
  const cookie = rawCookie.split(";").find((cookie) => cookie.startsWith("token="));
  return cookie?.split("=")[1];
}
