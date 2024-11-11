import { verifyPassword } from "@/lib/utils";
import { createUser, getUser } from "@/services/data-service";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        // First get the user without password verification
        const user = await getUser(email);

        if (!user) {
          throw new Error("Invalid email");
        }

        if (!user.password) {
          throw new Error("No password set for this user");
        }

        // Verify the password against the stored hash
        const isMatched = verifyPassword(password, user.password);

        if (!isMatched) {
          throw new Error("Invalid password");
        }

        // Return user data without sensitive information
        const userData = {
          fullName: user.fullName,
          email: user.email,
          id: user.id,
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
        const existingUser = await getUser(user.email as string);

        if (!existingUser) {
          await createUser({
            email: user.email as string,
            fullName: user.name as string,
            image: user.image as string,
          });
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async session({ session }) {
      const currUser = await getUser(session.user.email);
      if (currUser?.id) {
        session.user.id = currUser.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
