import { getUser } from "@/services/data-service";
import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./utils";

declare module "next-auth" {
  interface User {
    id?: string | undefined;
    email?: string | undefined | null;
    phone_number: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    expires: string;
    error: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone_number: { label: "Phone number", type: "string" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const phone_number = credentials.phone_number as string | undefined;
        const password = credentials.password as string | undefined;

        if (!phone_number || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        // First get the user without password verification
        const user = await getUser(phone_number);

        if (!user) {
          throw new Error("Invalid email");
        }

        if (!user.password) {
          throw new Error("No password set for this user");
        }

        // Verify the password against the stored hash
        const isMatched = await verifyPassword(password, user.password);

        if (!isMatched) {
          throw new Error("Invalid password");
        }

        // Return user data without sensitive information
        const userData = {
          id: user.id,
          phone_number: user.phone_number,
        };

        return userData;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.phone_number);

        if (!existingUser) {
          return false;
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
        token.phone_number = user.phone_number;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          phone_number: token.phone_number as string,
        },
      };
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: { strategy: "jwt" },
});
