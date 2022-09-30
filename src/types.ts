export {};

declare global {
  namespace Express {
    // Override User interface for passport.serializeUser
    interface User {
      username: string;
      id: number;
    }
  }
}
