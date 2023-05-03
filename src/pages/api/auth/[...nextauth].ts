import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
  providers : [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  secret: process.env.SECRET,
  callbacks:{
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(user, account, profile, email, credentials);
    //   return true
    // },
    async redirect({ url, baseUrl }) {
      console.log(url);
      
      return baseUrl + '/'
    },
  }
})