import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/utils/frontend-env-variables.js";
import CustomFooter from "../../components/utils/CustomFooter";
import Section from "../../components/classes/Section";
import HeroImage from "../../components/classes/HeroImage";
import {useClassSections} from "../../components/utils/hooks/useClassSections";
import {useEffect} from "react";
//import axios from "axios";
import {useRouter} from "next/router";

/**
 * GAME IDs
 *
 * - 1 -> choose correct answer game
 * - 2 -> ??
 */

const SixthClass = () => {
    const router = useRouter()
    const classSections = useClassSections('url')
    /*
    useEffect(() => {
        axios.post('/api/games/getGameStage')
            .then(res => console.log(res))
            .catch(async (err) => {
                console.log(err.response.data)
                await router.push('/api/auth/signin')
            })
    }, []);
    */
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

/*
export async function getServerSideProps(context) {
    return useBackendAuth(context, (session) => {
        return { props: {session} }
    })
}
*/