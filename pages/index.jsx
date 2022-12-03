import CustomHead from "../components/utils/CustomHead";
import {colorThemeLight, colorThemeDark} from "../lib/env-variables";
import CustomFooter from "../components/utils/CustomFooter";

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
    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main className={'container-fluid'}>

            </main>

            <CustomFooter/>
        </>
    )
}

export default Home;
