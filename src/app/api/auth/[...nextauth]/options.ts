import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        // const res = await fetch("http://localhost:3000/api/auth/login", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   }),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        // console.log(user);
        const res = await axios.post(
          "https://user-api.dev.grailfarmer.app/api/v1/auth/login-email",
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );
        const user = res.data;
        console.log(user);
        // return user;
        // const headers = { Authorization: `Bearer ${user.access_token}` };

        // const userInfo = await axios.get(
        //   "https://user-api.dev.grailfarmer.app/api/v1/users/profile",
        //   {
        //     headers,
        //   }
        // );
        // const userData = userInfo.data;

        // If no error and we have user data, return it

        if (user) {
          return user;
        } else {
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
  ],

  // pages: {
  //   signIn: "/login",
  // },
};
