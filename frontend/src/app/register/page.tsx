"use client"

import React from "react";
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

type Props = {
    children?: React.ReactNode
}

export type RegisterInfo = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirm_password: string,

}

const Page = (props: Props) => {
    const {} = useSession({
        required: false,
    });

    const {register, handleSubmit} = useForm<RegisterInfo>();

    const onSubmit = handleSubmit((data) => {

    });

    return <div className="container flex items-center justify-center h-screen">
        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
            <form onSubmit={onSubmit}>
                <Label htmlFor="firstname">Firstname</Label>
                <Input {...register('firstname')} id="firstname" type="text" placeholder="Firstname"/>

                <Label htmlFor="lastname">Lastname</Label>
                <Input {...register('lastname')} id="lastname" type="text" placeholder="Lastname"/>

                <Label htmlFor="email">Email</Label>
                <Input {...register('email')} id="email" type="email" placeholder="Email"/>

                <Label htmlFor="password">Password</Label>
                <Input {...register('password')} id="password" type="password" placeholder="Email"/>


                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input {...register('confirm_password')} id="confirm_password" type="password" placeholder="Email"/>

                <Button type={'submit'}>Register</Button>
            </form>

        </div>
    </div>
}

export default Page;