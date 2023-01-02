import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";

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
                />
                <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Devátá třída'}
                />
                <div className={'container-fluid'}>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default NinthClass