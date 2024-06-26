import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google" 
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

require('dotenv').config();
const adminEmails = process.env.LIST_ADMIN_EMAIL.split(',');

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({ // Add Google as a provider
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user}) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session
      } else {
        return false
      }
    }
  }
}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res){
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw new Error('Unauthorized')
  }
}