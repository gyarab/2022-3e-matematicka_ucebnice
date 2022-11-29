import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";

const EightClass = (props) => {
    /*
    TODO -> how to render class game list?
    TODO -> getting game props from database?
    TODO -> !!! game lazy load implementation !!!
     */

    return (
        <>
            <CustomHead
                title={'MU - osmá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main className={'container-fluid'}>
                <NavBar />
                <h1>osmá třída</h1>
            </main>
            <CustomFooter/>
        </>
    )
}

export default EightClass