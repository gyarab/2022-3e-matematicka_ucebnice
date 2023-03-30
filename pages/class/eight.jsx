import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic'
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import HeroImage from "../../components/classes/HeroImage";
import {useBackendAuth} from "../../components/utils/hooks/useBackendAuth";

const ChooseCorrectAnswer = dynamic(() => import('../../components/games/choose-correct-answer/ChooseCorrectAnswer'), {
    loading: () => <LoadingSpinner/>
})

const EightClass = (props) => {
    /*
    TODO -> how to render class game list?
    TODO -> getting game props from database?
     */

    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)
    }, [])

    const game = [
        {
            gameId: 0,
            autogenerate: false,
            question: 'Kolik je 1+1?',
            answers: ['2', '3', '8'],
            correctAnswer: '2',
            helperText: 'Pokud budu mít jedno jablko a přidám ještě jedno, kolik jich budu mít?',
            equation: null,
        },
        {
            gameId: 1,
            autogenerate: false,
            question: '',
            answers: ['', ''],
            correctAnswer: '',
            helperText: '', // if not stated -> null
            equation: '', // if not stated -> null
        },
        {
            gameId: 2,
            autogenerate: true,
            class: '6',
        },
        {
            gameId: 3,
            autogenerate: true,
            class: '', // class number (required)
        }
    ]

    return (
        <>
            <CustomHead
                title={'MU - osmá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main className={'mt-5'}>
                <NavBar
                    activeRoute={'/class/eight'}
                />
                <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Osmá třída'}
                />
            </main>
            <CustomFooter/>
        </>
    )
}

export default EightClass

export async function getServerSideProps(context) {
    return useBackendAuth(context, (session) => {
        return {props: {session}}
    })
}