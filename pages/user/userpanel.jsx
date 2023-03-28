import CustomHead from "../../components/utils/CustomHead";

import NavBar from "../../components/nav-bar/NavBar";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import classStyles from '../../styles/Class.module.css'
import GameStatsCard from "./GamestatsCard";
import {useBackendAuth} from "../../components/utils/hooks/useBackendAuth";

/**
 * USER PANEL
 *
 * - component shows user's score, stats, etc.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const UserPanel = () => {
    return (
        <>
            
            <main>


            <NavBar />
            <CustomFooter/>
            
            <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Muj učet'}
            />
            <div className={`container-fluid ${classStyles.mainContainer} w-100`}>

            <GameStatsCard
                gameTitle={'nejaka hra'} 
                statsMap ={''}
                
                
                />
            
            </div>
            
            </main>
        </>
    )
}

export default UserPanel

export async function getServerSideProps(context) {
    return useBackendAuth(context, (session) => {
        return { props: {session} }
    })
}