import NextAuth from "next-auth";
//import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
//import GoogleProvider from "next-auth/providers/google";

import { buildPath, extractData } from "@/lib/file-helper";
import { verifyPassword } from "@/lib/auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const filePath = buildPath("user.json");
          const dataUser = extractData(filePath);

          // check user exsist on db to identify email
          const exsitsUser = dataUser.find((user) => user.email === credentials.email);
          if (!exsitsUser) {
            throw new Error("Not found user");
          }

          // identify password
          const isValid = await verifyPassword(credentials.password, exsitsUser.password);
          if (!isValid) {
            throw new Error("Could not you log in !");
          }

          return exsitsUser;
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID ?? "",
    //   clientSecret: process.env.GOOGLE_SECRET ?? "",
    // }),
    // ...add more providers here
  ],
  callbacks: {},
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
