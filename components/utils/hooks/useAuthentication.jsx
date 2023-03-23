import LoadingPage from "../LoadingPage";
import Error from "../Error";
import {useEffect, useState} from "react";

const useAuthentication = (status) => {
    const [data, setData] = useState({})

    useEffect(() => {
        if (status === "loading") {
            console.log(status)
            setData({
                authenticated: false,
                component: <LoadingPage/>
            })
        } else if (status === 'unauthenticated') {
            console.log(status)
            setData({
                authenticated: false,
                component: <Error status={401} message={'Nejste přihlášený!'}/>
            })
        } else {
            setData({
                authenticated: true,
                component: null
            })
        }
    }, [status]);

    return data
}

export default useAuthentication;