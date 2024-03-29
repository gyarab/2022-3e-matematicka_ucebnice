import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import {TypeORMLegacyAdapter} from "@next-auth/typeorm-legacy-adapter";
import {SnakeNamingStrategy} from 'typeorm-naming-strategies'
import {heroImagePath, logoImagePath} from "../../../lib/utils/frontend-env-variables";


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // ...add more providers here
    ],
    adapter: TypeORMLegacyAdapter({
        type: "postgres",
        host: process.env.HOST,
        port: process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        namingStrategy: new SnakeNamingStrategy(),
    }),
    callbacks: {
        async redirect({url, baseUrl}) {
            return baseUrl + '/homepage';
        },
    },
    theme: {
        colorScheme: "light",
        logo: logoImagePath
    }
})