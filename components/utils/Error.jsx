import Router from "next/router";
import {Button, Card} from "react-bootstrap";
import verificationStyles from "../../styles/Verification.module.css";

const Error = ({message, status}) => {

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
        <div className="w-100 d-flex flex-column align-items-center justify-content-center vh-100">
            <Card
                className={`w-75 darkShadow border-0 rounded-3`}
            >
                <div className="container">
                    <div className={`d-flex flex-row align-items-center mt-3`}>
                        <h1 className="text-primary me-3">Chyba</h1><h1><kbd>{status}</kbd></h1>
                    </div>
                    <h6 className="pt-3 text-dark">
                        {message}
                    </h6>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center m-2">
                    <Button
                        variant={"primary"}
                        type={'submit'}
                        className={`${verificationStyles.submitButton} m-1 hoverDarkShadow`}
                        onClick={handleButtonClick}
                    >
                        {generateButtonDescription()}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Error