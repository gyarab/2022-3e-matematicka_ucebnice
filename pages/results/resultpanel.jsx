import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import NavBar from "../../components/nav-bar/NavBar";
import CustomFooter from "../../components/utils/CustomFooter";

const ResultPanel = (props) => {
    return (
        <>
            <CustomHead
                title={'MU - výsledky'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main>
                <NavBar />
            </main>

            <CustomFooter/>
        </>
    )
}

export default ResultPanel