import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/utils/frontend-env-variables.js";
import CustomFooter from "../../components/utils/CustomFooter";
import MyClass from "../../components/classes/MyClass";
import HeroImage from "../../components/classes/HeroImage";
import {useClassSections} from "../../components/utils/hooks/useClassSections";
//import axios from "axios";
import {doBackendAuth} from "../../components/utils/hooks/doBackendAuth";

/**
 * GAME IDs
 *
 * - 1 -> choose correct answer game
 * - 2 -> ??
 */

const SixthClass = (email) => {
    const myClass = useClassSections('url')
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
                <div className={`container-fluid w-100 mb-4`}>
                    <MyClass
                        games={myClass}
                        email={email}
                    />
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default SixthClass;

export async function getServerSideProps(context) {
    return doBackendAuth(context, (session) => {
        return { props: {email: session.user.email} }
    })
}