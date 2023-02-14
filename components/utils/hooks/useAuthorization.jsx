import LoadingPage from "../LoadingPage";
import Error from "../Error";

const useAuthorization = (status) => {
    if (status === "loading") {
        return {
            authenticated: false,
            component: <LoadingPage />
        }
    }

    if (status === 'unauthenticated') {
        return {
            authenticated: false,
            component: <Error status={401} message={'Nejste přihlášený!'}/>
        }
    }

    return {
        authenticated: true,
        component: null
    }
}

export default useAuthorization;