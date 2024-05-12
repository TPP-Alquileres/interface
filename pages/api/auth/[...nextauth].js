import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../_base";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  database: process.env.DATABASE_URL,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.uid = user.id;
        token.email = user.email;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.uid;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn( { user } ) {
      const aUser = await prisma.user.findUnique( { where: { email: user.email } } );
      if (!aUser) {
        await prisma.user.create( { data: 
          { email: user.email, name: user.name } 
        } );
      }
      return true;
    }
  }
}

export default NextAuth(authOptions)