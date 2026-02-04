import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";

import User from "@/models/User";
import { connectDB } from "@/lib/db";

export const authOptions: AuthOptions = {

  providers: [

    CredentialsProvider({

      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password   
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },

    }),

  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },

  jwt: {
    maxAge: 60 * 60, // 1 hour
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {

    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },

  },

  secret: process.env.NEXTAUTH_SECRET,
};