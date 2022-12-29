import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";

const SeventhClass = (props) => {
    return (
        <>
            <CustomHead
                title={'MU - sedmá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main>
                <NavBar
                    activeRoute={'/class/seventh'}
                />
                <div className={'container-fluid'}>
                    <h1>Sedmá třída</h1>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default SeventhClass