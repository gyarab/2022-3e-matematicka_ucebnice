import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";
import GameStatsCard from "../../components/account-page/GameStatsCard";
import {useBackendAuth} from "../../components/utils/hooks/useBackendAuth";


const Account = () => {
    const map = new Map()
    map.set('nejlepsi vysledek:', '3ka! ☻')
    map.set('nejlepsi vysledek1:', '3ka! ☻')
    map.set('nejlepsi vysledek2:', '3ka! ☻')


    return (
        <>
            <CustomHead
                title={'MU - šestá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main className={'mt-5'}>
                <NavBar
                    activeRoute={'/user/account'}
                />
                <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Můj účet'}
                />
                <div className={`container-fluid w-100`}>
                    <ul
                        className={`p-2`}
                    >
                        <GameStatsCard
                            gameTitle={'nejaka hra'}
                            statsMap={map}
                        />
                    </ul>
                </div>
            </main>

            <CustomFooter/>
        </>

    )
}

export default Account

export async function getServerSideProps(context) {
    return useBackendAuth(context, (session) => {
        return { props: {session} }
    })
}