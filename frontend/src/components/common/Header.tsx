"use client";

import React, {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import useAppAuth from "@/hooks/useAppAuth";

type Props = {
    children?: React.ReactNode
}

const Header = (props: Props) => {
    const {isLoggedIn} = useAppAuth();
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
        await signOut()
        setLoading(false)
    }


    return <div className="absolute top-0 left-0 w-screen flex w-full justify-center gap-x-5 py-4">
        <Link href="/">Home</Link>
        <Link href="/guest-only">Guest Only</Link>
        <Link href="/auth-only">Auth Only</Link>
        <Link href="/public-only">Public Only</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>

        {isLoggedIn && <Button loading={loading} disabled={loading} color="destruction" className="absolute
        right-2 top-2" onClick={handleLogout}>Logout</Button>}
    </div>
}

export default Header;