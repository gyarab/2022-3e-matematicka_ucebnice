import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import Section from "../../components/classes/Section";
import HeroImage from "../../components/classes/HeroImage";
import {useClassSections} from "../../components/utils/hooks/useClassSections";
import {useSession} from "next-auth/react";
import useAuthentication from "../../components/utils/hooks/useAuthentication";
import {useBackendAuth} from "../../components/utils/hooks/useBackendAuth";

/**
 * GAME IDs
 *
 * - 1 -> choose correct answer game
 * - 2 -> ??
 */

const SixthClass = () => {
    const classSections = useClassSections('url')

    return (
        <>
            <CustomHead
                title={'MU - šestá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main className={'mt-5'}>
                <NavBar
                    activeRoute={'/class/sixth'}
                />
                <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Šestá třída'}
                />
                <div className={`container-fluid w-100`}>
                    <ul
                        className={`p-2`}
                    >
                        {classSections.map((section, index) => {
                            return (
                                <Section
                                    key={index}
                                    id={index}
                                    title={section.title}
                                    games={section.games}
                                />
                            )
                        })}
                    </ul>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default SixthClass;

export async function getServerSideProps(context) {
    return useBackendAuth(context, (session) => {
        return { props: {session} }
    })
}