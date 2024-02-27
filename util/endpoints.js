const production = process.env.NODE_ENV === "production";

export const SITE_URL = production
  ? "https://www.askpdfs.io"
  : "http://localhost:3000";
