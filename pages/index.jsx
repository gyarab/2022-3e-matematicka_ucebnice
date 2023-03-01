import CustomHead from "../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../lib/frontend-env-variables";
import CustomFooter from "../components/utils/CustomFooter";
import LoginForm from "../components/verification/Login";
import indexStyles from '../styles/IndexPage.module.css';
import {useSession} from "next-auth/react";

/*
async function getServerSideProps(context) {
    try {
        const token = cookie.parse(context.req.headers.cookie).accesToken
        const authSession = await validateToken({token: token})
        if (!authSession) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false
                }
            }
        }

        return {props: {}}
    } catch (e) {
        return {props: {}}
    }
}
 */

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

    const {data: session} = useSession();

    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main className={`d-flex align-items-center`} style={{height: '100vh'}}>
                <div className={indexStyles.backgroundCircle}></div>
                <div className={`w-100 h-100 d-flex flex-row align-items-center justify-content-between m-5`}>
                    <div className={indexStyles.contentContainer}>
                        <h1 className={`text-center ${indexStyles.title}`}>Matematická učebnice</h1>
                        <p className={indexStyles.text}>
                            {
                                JSON.stringify(session)
                            }
                        </p>
                    </div>
                    <div className={indexStyles.contentContainer}>
                        <LoginForm
                            loginCallbackURL={'/homepage'}
                        />
                    </div>
                </div>
            </main>

            <CustomFooter/>
        </>
    )
}

export default Home;
