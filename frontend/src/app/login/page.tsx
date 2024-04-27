"use client"

import React from "react";
import {Label} from "@/components/ui/label";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Credentials, login} from "@/lib/auth";
import useAppAuth from "@/hooks/useAppAuth";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";



type Props = {
    children?: React.ReactNode
}

const Page = (props: Props) => {
    const {register, handleSubmit, formState} = useForm<Credentials>({
        defaultValues: {
            password: '2559069dev',
            email: 'christianlugod05@gmail.com'
        },
    });

    const onSubmit = handleSubmit(async (data) => {
       await signIn('login', data);
    });


    return <div className="container flex items-center justify-center h-screen">
        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
            <form onSubmit={onSubmit}>
                <Label htmlFor="email">Email</Label>
                <Input  {...register('email')} id="email" type="email" placeholder="Email"/>
                <Label htmlFor="email">Password</Label>
                <Input   {...register('password')} id="email" type="password" placeholder="Password"/>
                <Button loading={formState.isSubmitting} disabled={formState.isSubmitting} type={'submit'}>Login</Button>
            </form>
            <hr/>
        </div>

    </div>
}

export default Page;