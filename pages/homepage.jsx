import NavBar from "../components/nav-bar/NavBar";
import CustomHead from "../components/utils/CustomHead";
import CustomFooter from "../components/utils/CustomFooter";
import {colorThemeLight, colorThemeDark} from "../lib/env-variables";

/**
 * APPLICATION HOME PAGE
 *
 * - initial signpost
 * - user can get to any class page and gets some information about using this application
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = (props) => {
    /*
    TODO -> create panels as links to classes
    TODO -> how to use this app?
     */

    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main className={'container-fluid'}>
                <NavBar/>
            </main>

            <CustomFooter/>
        </>
    )
}

export default HomePage