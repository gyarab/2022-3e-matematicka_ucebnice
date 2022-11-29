import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";

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

            <main className={'container-fluid'}>
                <NavBar />
            </main>

            <CustomFooter/>
        </>
    )
}

export default Register