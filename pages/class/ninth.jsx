import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";

const NinthClass = (props) => {
    return (
        <>
            <CustomHead
                title={'MU - devátá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main>
                <NavBar
                    activeRoute={'/class/ninth'}
                    imgPath={'/android-chrome-512x512.png'}
                />
                <div className={'container-fluid'}>
                    <h1>devátá třída</h1>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default NinthClass