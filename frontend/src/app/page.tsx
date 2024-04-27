"use client";

import {useSession} from "next-auth/react";

const Home = () => {
    const {data: session} = useSession();

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            Homepage
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </main>
    );
}

export default Home;
