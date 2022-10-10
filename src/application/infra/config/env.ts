export const env = {
  mongoUri: process.env.MONGO_URL ?? "mongodb://127.0.0.1:56328",
  jwtSecret: process.env.JWT_SECRET ?? "jk43h5jk43h5k34222",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "jk43h5jk43h5k34226",
  port: process.env.PORT ?? 8080,
  environment: process.env.NODE_ENV ?? "development",
};
