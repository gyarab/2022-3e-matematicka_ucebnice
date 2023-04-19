import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/utils/frontend-env-variables.js";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";
import { doBackendAuth } from "../../components/utils/hooks/doBackendAuth";

const SeventhClass = (props) => {
    return (
        <>
            <CustomHead
                title={'MU - sedmá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main className={'mt-5'}>
                <NavBar
                    activeRoute={'/class/seventh'}
                />
                <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Sedmá třída'}
                />
                <div className={'container-fluid'}>

                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default SeventhClass

export async function getServerSideProps(context) {
    return await doBackendAuth(context, (session) => {
        return { props: {session} }
    })
}