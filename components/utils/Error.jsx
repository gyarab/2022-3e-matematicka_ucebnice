import Router from "next/router";
import {Button} from "react-bootstrap";
import verificationStyles from "../../styles/Verification.module.css";

const Error = ({message, status}) => {

    /*
    TODO -> je potřeba nadesignovat pomocí bootstrapu
    TODO -> např. <div classname={`d-flex p-2 align-items-center`}>  ===> je to jen random styl (jen abyste věděli, jak to vypadá)
    TODO -> kdybyste nevěděli, pište...
     */

    const generateButtonDescription = () => {
        if (status === 401)
            return 'Přihlášení'
        else if (status === 403)
            return 'Zpět na hlavní stránku'
        else
            return 'Zpět na hlavní stránku'
    }

    const handleButtonClick = async (e) => {
        const name = e.target.innerHTML
        if (name === 'Přihlášení')
            await Router.push('/verification/login')
        else
            await Router.push('/homepage')
    }

    return (
        <div>
            <div>
                <div>
                    <h1>{status}</h1><h1>CHYBA</h1>
                </div>
                <div>
                    <p>
                        {message}
                    </p>
                    <Button
                        variant={"primary"}
                        type={'submit'}
                        className={`${verificationStyles.submitButton} m-1 hoverDarkShadow`}
                        onClick={handleButtonClick}
                    >
                        {generateButtonDescription()}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Error