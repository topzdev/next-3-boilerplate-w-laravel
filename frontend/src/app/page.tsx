"use client";
import {Button} from "@/components/ui/button";
import {getClientSession, getSession} from "@/lib/auth";
import {logout} from '@/lib/auth';

export default function Home() {
    const session = getClientSession();
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            Homepage

            {JSON.stringify(session)}

            <Button onClick={logout}>Logout</Button>
        </main>
    );
}
