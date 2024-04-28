import {useEffect, useMemo, useState} from "react";
import {signIn, useSession, UseSessionOptions} from "next-auth/react";
import {RegisterInfo, Credentials} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {homeRoute} from "@/middleware";


const useAppAuth = (options?: UseSessionOptions<any>) => {
    const {data: session, update, status} = useSession(options);

    const authState = useMemo(() => {
        return {
            isLoggedIn: !!session,
            user: session?.user,
            access_token: session?.access_token
        }
    }, [session]);

    const register = async (info: RegisterInfo) => {
        await signIn('register', {
            ...info,
            redirect: false
        }).then(data => {
            if (data?.error) {
                throw JSON.parse(data.error)
            }
            window.location.href = data?.url || homeRoute
        })
    }

    const login = async (credentials: Credentials) => {
        await signIn('login', {...credentials, redirect: false}).then(data => {
            if (data?.error) {
                throw JSON.parse(data.error)
            }
            window.location.href = data?.url || homeRoute
        }) ;
    }

    const oauthLogin = async (provider: 'google' | 'facebook') => {
        await signIn(provider, { ...{provider}}).then(data => {
            // console.log(data);
            // if (data?.error) {
            //     throw JSON.parse(data.error)
            // }
            // window.location.href = data?.url || homeRoute
        }) ;
    }

    return {
        ...authState,
        session,
        update,
        status,
        register,
        oauthLogin,
        login
    }
}


export default useAppAuth;