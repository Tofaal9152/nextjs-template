export const env: {
  BACKEND_URL: string | undefined;
  SESSION_SECRET_KEY: string | undefined;
  SESSION_COOKIE_NAME: string | undefined;
  SESSION_MAX_AGE_DAYS: string | undefined;
} = {
  BACKEND_URL: process.env.BACKEND_URL,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_DAYS: process.env.SESSION_MAX_AGE_DAYS,
};
