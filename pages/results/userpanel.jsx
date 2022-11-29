import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import NavBar from "../../components/nav-bar/NavBar";
import CustomFooter from "../../components/utils/CustomFooter";

/**
 * USER PANEL
 *
 * - component shows user's score, stats, etc.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const UserPanel = () => {
    return (
        <>
            <CustomHead
                title={'MU - výsledky'}
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

export default UserPanel