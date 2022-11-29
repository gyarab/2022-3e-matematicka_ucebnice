import NavBar from "../components/nav-bar/NavBar";
import CustomHead from "../components/utils/CustomHead";
import CustomFooter from "../components/utils/CustomFooter";
import {colorThemeLight, colorThemeDark} from "../lib/env-variables";

const HomePage = (props) => {
    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main>
                <NavBar/>
            </main>

            <CustomFooter/>
        </>
    )
}

export default HomePage