import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import Section from "../../components/classes/Section";
import classStyles from '../../styles/Class.module.css'
import HeroImage from "../../components/classes/HeroImage";
import {useClassSections} from "../../components/utils/hooks/useClassSections";
import {useSession} from "next-auth/react";
import useAuthorization from "../../components/utils/hooks/useAuthorization";

/**
 * GAME IDs
 *
 * - 1 -> choose correct answer game
 * - 2 -> ??
 */

const SixthClass = ({}) => {
    const {data: session, status} = useSession()
    const classSections = useClassSections('url', status)
    const {authenticated, component} = useAuthorization(status)

    if (!authenticated)
        return component


    return (
        <>
            <CustomHead
                title={'MU - šestá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main>
                <NavBar
                    activeRoute={'/class/sixth'}
                />
                <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Šestá třída'}
                />
                <div className={`container-fluid ${classStyles.mainContainer} w-100`}>
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

export default SixthClass