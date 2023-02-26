import Router from "next/router";
import { Button, Card } from "react-bootstrap";
import verificationStyles from "../../styles/Verification.module.css";

const Error = ({ message, status }) => {

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
        <div className="container mx-auto pt-5">
            <div className="">
                <Card
                    bg={'primary'}
                    text={'white'}
                    className={"mx-auto"}
                    style={{ height: '15rem' }}
                > <div className="container">
                        <h1 className="pt-3 text-secondary">CHYBA {status}</h1>
                        <p className="pt-3">
                            {message}
                        </p>
                    </div>
                    <div className="position-absolute bottom-0 start-20 pb-2 ps-2">
                        <Button
                            variant={"secondary"}
                            type={'submit'}
                            style={{ width: '8rem' }}
                            className={`${verificationStyles.submitButton} m-1 hoverDarkShadow`}
                            onClick={handleButtonClick}
                        >
                            {generateButtonDescription()}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Error