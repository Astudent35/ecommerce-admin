import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google" 
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({ // Add Google as a provider
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)