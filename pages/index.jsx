import CustomHead from "../components/utils/CustomHead";
import {colorThemeLight, colorThemeDark} from "../lib/env-variables";
import CustomFooter from "../components/utils/CustomFooter";

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
