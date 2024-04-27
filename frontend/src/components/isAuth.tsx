"use client";
import {useEffect} from "react";
import {redirect} from "next/navigation";
import useAppAuth from "@/hooks/useAppAuth";


export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const {isLoggedIn} = useAppAuth();


        if (!isLoggedIn) {
            return null;
        }

        return <Component {...props}/>;
    };
}