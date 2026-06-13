import type { NextAuthConfig } from "next-auth";

function getAuthSecret(): string {
  return (
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "proxyforge-dev-secret-change-before-deploy"
  );
}

export const authConfig = {
  secret: getAuthSecret(),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isCheckout = nextUrl.pathname.startsWith("/checkout");
      const isAdmin = nextUrl.pathname.startsWith("/admin");

      if ((isDashboard || isCheckout || isAdmin) && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.createdAt = (user as { createdAt?: string }).createdAt;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.id) session.user.id = token.id as string;
        if (token.name) session.user.name = token.name as string;
        if (token.email) session.user.email = token.email as string;
        if (token.createdAt) session.user.createdAt = token.createdAt as string;
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
