import ky from 'ky';


const instance = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'http://127.0.0.1:8000'
    },
    hooks: {
        beforeRequest: [
            request => {
                const token = window.localStorage.getItem('access_token');

                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            }
        ]
    }
});

export default instance;

