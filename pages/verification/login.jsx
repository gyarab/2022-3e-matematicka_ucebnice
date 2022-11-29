import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";

const Login = (props) => {
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

            <main className={'container-fluid'}>
                <NavBar />
            </main>

            <CustomFooter/>
        </>
    )
}

export default Login