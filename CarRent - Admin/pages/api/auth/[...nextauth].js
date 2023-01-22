import NextAuth from "next-auth";
import Providers from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "lib/strapi-auth";

export const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        if (credentials == null) return null;

        try {
          const { user, jwt } = await signIn({
            identifier: credentials.identifier,
            password: credentials.password,
          });

          return { ...user, jwt };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.jwt = token.jwt;
      session.id = token.id;
      return Promise.resolve(session);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
