import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/utils/frontend-env-variables.js";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";
import {doBackendAuth} from "../../components/utils/hooks/doBackendAuth";

const NinthClass = (props) => {
    return (
        <>
            <CustomHead
                title={'MU - devátá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main className={'mt-5'}>
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

export async function getServerSideProps(context) {
    return doBackendAuth(context, (session) => {
        return { props: {session} }
    })
}