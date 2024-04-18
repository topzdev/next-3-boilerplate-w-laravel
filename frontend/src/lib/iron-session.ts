import {SessionOptions} from "iron-session";

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
}


export interface SessionData {
    user: User | null,
    isLoggedIn: boolean;
    access_token: string;
}

export const defaultSession: SessionData = {
    user: null,
    access_token: '',
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: "turing-test-2024-authentication-next-app-turing-end",
    cookieName: "authentication-next-app",
    cookieOptions: {
        // secure only works in `https` environments
        // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
        secure: process.env.NODE_ENV === 'production',
    },
};