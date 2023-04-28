import CustomHead from "../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../lib/utils/frontend-env-variables.js";
import CustomFooter from "../components/utils/CustomFooter";
import indexStyles from '../styles/IndexPage.module.css';
import {getSession, signIn} from "next-auth/react";
import {Button, Card} from "react-bootstrap";
import verificationStyles from "../styles/Verification.module.css";

const text = 'Vítejte na webové aplikaci, ve které si můžete procvičovat všechny možné typy příkladů z\n' +
    '                            matematiky rozdělených dle tříd a podle Vaší úrovně a to formou různých her.\n' +
    '                 '

/**
 * INDEX PAGE
 *
 * - component shows basic public information about this application
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {
    /*
    TODO -> authentication panel
    TODO -> basic info about the app
    TODO -> page design
     */

    const handleGoogleAuthLogin = async (e) => {
        await signIn()
    }

    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main className={`d-flex align-items-center justify-content-center`} style={{height: '100vh'}}>
                <div className={indexStyles.backgroundCircle}></div>
                <Card className={`w-75 darkShadow`} style={{maxWidth: '686.6px'}}>
                    <Card.Body>
                        <Card.Title className={'fw-bold'}>Vítejte v aplikaci</Card.Title>
                        <Card.Text>
                            {text}
                        </Card.Text>
                        <Button
                            variant={'outline-secondary'}
                            type={'button'}
                            className={`hoverDarkShadow`}
                            onClick={handleGoogleAuthLogin}
                        >
                            Přihlášení
                        </Button>
                    </Card.Body>
                </Card>
            </main>
            <CustomFooter/>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: "/homepage",
                permanent: false
            }
        }
    }

    return {props: {}}
}

export default Home;