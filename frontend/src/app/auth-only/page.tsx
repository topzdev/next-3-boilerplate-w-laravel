
"use client"

import React from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import useAppAuth from "@/hooks/useAppAuth";

type Props = {
    children?: React.ReactNode
}
export default function Page() {
    const {session} = useAppAuth();

    return <>
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>
                Auth Only Pages
            </h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </main>

    </>
}
Page.auth = true;
