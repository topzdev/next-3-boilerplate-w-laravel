"use server";

import {getIronSession} from "iron-session";
import {defaultSession, SessionData, sessionOptions, User} from "@/lib/iron-session";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const loginRoute = '/login';
const homeRoute = '/';

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

type LoginResponse = {
    user: User,
    access_token: string
}
export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.access_token = defaultSession.access_token;
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.user = defaultSession.user;
    }

    return session;
}

export const getClientSession = () => {
    return getSession().then(res => res);
}

export const fetchUser = async () => {
    const session = await getSession();

    console.log('Access Token',session.access_token);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'Referer': 'http://127.0.0.1:8000'
        }
    }).then(res => res.json());

    console.log('Get User Session',response);

    session.user = response;
    session.isLoggedIn = true;

    await session.save();

}
export const login = async (credentials: Credentials) => {
    console.log('Login Creds', credentials)
    const session = await getSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Referer': 'http://127.0.0.1:8000'
        }
    }).then(res => res.json())

    console.log("Login Response",response);
    session.access_token = response.access_token
    await session.save();
    await fetchUser();
    redirect(homeRoute);
}
export const register = async (info: RegisterInfo) => {
    const session = await getSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(info),
    }).then(res => res.json())

    session.access_token = response.access_token
    await session.save();
    await fetchUser();
    redirect(homeRoute);
}

export const logout = async () => {
    const session = await getSession();
   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Referer': 'http://127.0.0.1:8000'
        }
    })
    console.log(response);
    redirect(loginRoute)
}
