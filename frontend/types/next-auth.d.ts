import {User} from "next-auth";

export type AuthUser = {
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

declare module "next-auth" {
    import {DefaultSession} from "next-auth";
    import { JWT } from "next-auth/jwt";

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        user: AuthUser,
        access_token: string
    }
    interface Session {
        user: AuthUser,
        access_token: string
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        user: AuthUser,
        access_token: string
    }
}