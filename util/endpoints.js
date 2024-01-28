const production = process.env.NODE_ENV === "production";

export const SITE_URL = production
  ? "prod-url(SET IT HERE)"
  : "http://localhost:3000";
