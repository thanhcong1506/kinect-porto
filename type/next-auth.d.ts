import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      // userName: string;
      // name: string;
      email: string;
      access_token: string;
    };
  }
}
