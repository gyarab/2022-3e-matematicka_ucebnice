import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import verificationStyles from '../../styles/Verification.module.css'
import LoginForm from "../../components/verification/Login";


/**
 * LOGIN PAGE
 *
 * This component gets user input (email, password), which are authenticated on backend. Based on the result user is authenticated or error is showed
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {
    /*
    TODO -> login structure -> which db?, custom account + npm next-auth (Google auth)?
     */

    return (
        <>
            <CustomHead
                title={'MU - přihlášení'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main style={{height: '100vh'}}>
                <NavBar />
                <div
                    className={`container-fluid justify-content-center align-items-center ${verificationStyles.formContainer}`}
                >
                    <LoginForm/>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default Login