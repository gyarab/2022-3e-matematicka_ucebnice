import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";
import {useBackendAuth} from "../../components/utils/hooks/useBackendAuth";

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
    return useBackendAuth(context, (session) => {
        return { props: {session} }
    })
}