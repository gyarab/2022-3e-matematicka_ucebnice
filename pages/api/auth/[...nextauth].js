import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'username',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: {
                    password: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                if (credentials.email === '')
                    return null

                const user = {
                    name: credentials.email,
                    email: credentials.email,
                }
                return user
            }
        })
        // ...add more providers here
    ],
})