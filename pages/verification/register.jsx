import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import verificationStyles from "../../styles/Verification.module.css";
import RegisterForm from "../../components/verification/Register";

const Register = (props) => {
    /*
    TODO -> user registration (backend environment)
     */

    return (
        <>
            <CustomHead
                title={'MU - registrace'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main style={{height: '100vh'}}>
                <NavBar />
                <div
                    className={`container-fluid justify-content-center align-items-center ${verificationStyles.formContainer}`}
                >
                    <RegisterForm/>
                </div>
            </main>

            <CustomFooter/>
        </>
    )
}

export default Register