import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customBootstrap.scss'
import {SSRProvider} from "react-bootstrap";
import {SessionProvider} from "next-auth/react"

function MyApp(
    {
        Component,
        pageProps: {session, ...pageProps},
    }
) {
    return (
        <SSRProvider>
            <SessionProvider
                session={session}
                // Re-fetch session every 5 minutes
                refetchInterval={5 * 60}
                refetchOnWindowFocus={true}
            >
                <Component {...pageProps} />
            </SessionProvider>
        </SSRProvider>
    )
}

export default MyApp
