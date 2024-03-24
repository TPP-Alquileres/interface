import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session 
    },
    async signIn( { user } ) {
      const aUser = await prisma.user.findUnique( { where: { email: user.email } } );
      if (!aUser) {
        await prisma.user.create( { data: 
          { email: user.email, name: user.name } 
        } );
      }
      return true
    }
  }
}

export default NextAuth(authOptions)