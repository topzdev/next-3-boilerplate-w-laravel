"use client"

import React from "react";
import ReactQueryProviders from "@/components/providers/ReactQueryProvider";

type Props = {
    children?: React.ReactNode
}

const Providers = async ({children}: Props) => {
    return <ReactQueryProviders>
        {children}
    </ReactQueryProviders>


}

export default Providers;