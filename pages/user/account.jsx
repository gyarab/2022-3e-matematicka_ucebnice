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
import {useEffect} from "react";
import GameStatsCard from "./GamestatsCard";




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
                    description={'Muj učet'}
                />
                <div className={`container-fluid ${classStyles.mainContainer} w-100`}>
                    <ul
                        className={`p-2`}
                    >
                        <GameStatsCard
                            gameTitle={'nejaka hra'}
                            statsMap ={' '}
                        />
                    </ul>
                </div>
            </main>

            <CustomFooter/>
        </>

  )
}

export default Account