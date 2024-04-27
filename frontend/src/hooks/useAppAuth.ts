import {useEffect, useMemo, useState} from "react";
import {redirect, useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import ky from "@/lib/ky";
import {useSession, UseSessionOptions} from "next-auth/react";


const useAppAuth = (options?: UseSessionOptions<any>) => {
    const {data: session, update, status} = useSession(options);

    const authState = useMemo(() => {
        return {
            isLoggedIn: !!session,
            user: session?.user,
            access_token: session?.access_token
        }
    }, [session])

    return {
        ...authState,
        session,
        update,
        status
    }
}


export default useAppAuth;