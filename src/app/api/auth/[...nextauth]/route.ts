import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { isAdmin } from "@/lib/admin";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.isAdmin = isAdmin(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { isAdmin?: boolean }).isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
