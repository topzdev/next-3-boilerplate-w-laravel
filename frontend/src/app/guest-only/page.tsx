"use client"

import React from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import useAppAuth from "@/hooks/useAppAuth";

type Props = {
    children?: React.ReactNode
}

const Page = (props: Props) => {
    const {session} = useAppAuth({
        required: false,
    });

    return <>
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>
                Guest Only Pages
            </h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </main>

    </>
}

export default Page;