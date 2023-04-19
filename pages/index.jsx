import CustomHead from "../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../lib/utils/frontend-env-variables.js";
import CustomFooter from "../components/utils/CustomFooter";
import indexStyles from '../styles/IndexPage.module.css';
import {getSession, useSession} from "next-auth/react";
import LoginContainer from "../components/verification/LoginContainer";
import {doBackendAuth} from "../components/utils/hooks/doBackendAuth";

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

    const {data: session, status} = useSession();

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
                        <LoginContainer />
                    </div>
                </div>
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

    return { props: {}}
}

export default Home;