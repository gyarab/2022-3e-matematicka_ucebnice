import CustomHead from "../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../lib/frontend-env-variables";
import CustomFooter from "../components/utils/CustomFooter";
import LoginForm from "../components/verification/Login";
import indexStyles from '../styles/IndexPage.module.css'

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

            <main className={indexStyles.mainContainer}>
                <div className={indexStyles.backgroundCircle}></div>
                <div className={indexStyles.container}>
                    <div className={indexStyles.contentContainer}>
                        <h1 className={indexStyles.title}>Matematická učebnice</h1>
                        <p className={indexStyles.text}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer tempor. Duis pulvinar.
                            Pellentesque arcu. Nulla est. Aliquam erat volutpat. Phasellus faucibus molestie nisl. In
                            dapibus augue non sapien. Nulla quis diam. Sed ut perspiciatis unde omnis iste natus error
                            sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc,
                            commodo et, interdum suscipit, sollicitudin et, dolor. Duis risus. Pellentesque habitant
                            morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec quis nibh at
                            felis congue commodo. Mauris tincidunt sem sed arcu.
                        </p>
                    </div>
                    <div className={indexStyles.contentContainer}>
                        <LoginForm/>
                    </div>
                </div>
            </main>

            <CustomFooter/>
        </>
    )
}

export default Home;
