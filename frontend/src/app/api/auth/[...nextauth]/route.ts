import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ky from "@/lib/ky";

/*Next Auth Guide
* https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
*
* */

export type Credentials = {
    email: string,
    password: string
}

export type RegisterInfo = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string
}

export type UpdateUser = Pick<User, 'email' | 'firstname' | 'lastname'>

export type User = {
    id: number,
    provider: string | null,
    provider_id: number,
    firstname: string,
    lastname: string,
    email: string,
    email_verified_at: string,
    updated_at: string,
    created_at: string,
    is_facebook_registered?: boolean,
}

type LoginResponse = {
    access_token: string
}

export const authOptions: NextAuthOptions = {
    pages: {
      signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Login',
            id: 'login',
            async authorize(credentials, req) {
                console.log('Login Credential',credentials);

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })

                if (!response.ok) {
                    throw response.body
                }

                const data = (await response.json()) as LoginResponse;

                return {access_token: data.access_token};
            }
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            // console.log('Sign IN', {user,  account, profile, email, credentials})

            return true
        },
        async redirect({url, baseUrl}) {
            return baseUrl
        },
        async jwt({token, user, account, profile, isNewUser}) {
            // console.log('Token',{token, user, account, profile})
            if (!!user) {
                token.user = user.user
                token.access_token = user.access_token
            };
            return token
        },
        async session({session, token}) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':  token.access_token ? `Bearer ${token.access_token}` : ''
                }
            });

            if (!response.ok) {
                throw response.body
            }

            const user = await response.json();


            // console.log('Session', {session, user, token})

            return {
                ...session,
                user: user,
                access_token: token.access_token
            }
        },

    },
    events: {
        async signOut({token, session}) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.access_token}`,
                    'Referer': 'http://127.0.0.1:8000'
                }
            })

            if (!response.ok) {
                throw response.body;
            }
            const data = response.json();
            // console.log('Logout Response', data);
        },
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}