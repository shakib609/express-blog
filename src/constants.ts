export const DEBUG = process.env.NODE_ENV !== "production";
export const DB_SETTINGS = {
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
export const JWT_SECRET = `${process.env.JWT_SECRET}`;
