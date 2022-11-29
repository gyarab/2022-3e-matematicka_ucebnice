import CustomHead from "../components/utils/CustomHead";
import {colorThemeLight, colorThemeDark} from "../lib/env-variables";
import CustomFooter from "../components/utils/CustomFooter";

const Home = () => {
    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main>

            </main>

            <CustomFooter/>
        </>
    )
}

export default Home;
