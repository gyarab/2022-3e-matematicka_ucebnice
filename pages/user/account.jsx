import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";
import GameStatsCard from "../../components/account-page/GameStatsCard";


const Account = () => {
    return (
        <>
            <CustomHead
                title={'MU - šestá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main>
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
                            statsMap={new Map().set(1, 1).set(2, 2).set(3, 3)}
                        />
                    </ul>
                </div>
            </main>

            <CustomFooter/>
        </>

    )
}

export default Account