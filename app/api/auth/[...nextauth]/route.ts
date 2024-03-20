import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter : PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials:{
        email: {label : "Email", type : "email", placeholder: "Enter your email"},
        password: {label : "Password", type : "password", placeholder :"Enter your password"} 
      },
      async authorize(credentials, req){
        if(credentials?.email || credentials?.password) return null;

        const user = await prisma.user.findUnique({where: {email:credentials?.email}})

        if(!user) return null;
        const passwordMatch = await bcrypt.compare(credentials!.password, user.hashPassword!)

        return passwordMatch ? user : null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ], 
  session:{
    strategy: "jwt"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
