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
        const getUserData = async () => {
          try {
            // Gọi API login và lưu access_token
            const res = await axios.post(
              "https://user-api.dev.grailfarmer.app/api/v1/auth/login-email",
              {
                email: credentials?.email,
                password: credentials?.password,
              }
            );
            const access_token = res?.data.access_token;

            // Gọi API profile để lấy email và id
            const headers = {
              Authorization: `Bearer ${res.data.access_token}`,
            };
            const resUserInfo = await axios.get(
              "https://user-api.dev.grailfarmer.app/api/v1/users/profile",
              {
                headers: headers,
              }
            );

            const { id, email, phone, ...userInfo } = resUserInfo?.data;

            // Tạo đối tượng user từ access_token, email và id
            const user = { id, email, access_token };
            return Promise.resolve(user);
          } catch (error) {
            console.error(error);
            return Promise.reject(error);
          }
        };

        // Sử dụng hàm getUserData để lấy đối tượng user
        const user = await getUserData();
        console.log(user);
        if (user) {
          return user;
        } else {
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};
