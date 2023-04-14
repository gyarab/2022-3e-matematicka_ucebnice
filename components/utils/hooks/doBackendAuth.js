import {getSession} from "next-auth/react";

export async function doBackendAuth(context, callback) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false
            },
            props: {}
        }
    }

    return callback(session)
}