"use client"

import React from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

type Props = {
    children?: React.ReactNode
}

const Page = (props: Props) => {

    return <>
        <h1>
            Public Only Pages
        </h1>
    </>

}

export default Page;