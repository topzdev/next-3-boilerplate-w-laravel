"use client"

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import useAppAuth from "@/hooks/useAppAuth";

type Props = {
    children?: React.ReactNode
}

const GoogleLoginButton = (props: Props) => {
    const {oauthLogin} = useAppAuth();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        await oauthLogin('google');
        setLoading(false);

    }

    return <Button loading={loading} disabled={loading} onClick={handleSubmit} className="bg-blue-500">Login with
        Google</Button>

}

export default GoogleLoginButton;