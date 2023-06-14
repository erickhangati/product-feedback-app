import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { verifyPassword } from '../../../lib/auth';
import { getConnection } from '../../../data/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { client, collection } = await getConnection('users');
        const user = await collection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('User not found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in.');
        }

        client.close();
        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
