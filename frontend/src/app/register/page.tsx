"use client"

import React from "react";
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useAppAuth from "@/hooks/useAppAuth";
import {RegisterInfo} from "@/app/api/auth/[...nextauth]/route";
import {toast} from "@/components/ui/use-toast";

type Props = {
    children?: React.ReactNode
}

const Page = (props: Props) => {
    const {register: authRegister} = useAppAuth();
    const {register, formState, handleSubmit} = useForm<RegisterInfo>({
        defaultValues: {
            firstname: 'Christian',
            lastname: 'Lugod',
            email: 'christianlugod05@gmail.com',
            password_confirmation: '2559069dev',
            password: '2559069dev',
        },
    });

    const onSubmit = handleSubmit(async(data) => {
        try {
          const response = await authRegister(data);
        } catch (e: any) {
            console.log(e);
            toast({
                title: "Register Error",
                description: e?.message,
                variant: "destructive",
            })
        }
    });

    return <div className="container flex items-center justify-center h-screen">
        <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="firstname">Firstname</Label>
                    <Input {...register('firstname')} id="firstname" type="text" placeholder="Firstname"/>
                </div>

                <div>
                    <Label htmlFor="lastname">Lastname</Label>
                    <Input {...register('lastname')} id="lastname" type="text" placeholder="Lastname"/>

                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input {...register('email')} id="email" type="email" placeholder="Email"/>

                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input {...register('password')} id="password" type="password" placeholder="Password"/>

                </div>
                <div>
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input {...register('password_confirmation')} id="confirm_password" type="password" placeholder="Confirm Password"/>
                </div>
                <Button loading={formState.isSubmitting} disabled={formState.isSubmitting} className={'mt-2'} type={'submit'}>Register</Button>
            </form>

        </div>
    </div>
}

export default Page;