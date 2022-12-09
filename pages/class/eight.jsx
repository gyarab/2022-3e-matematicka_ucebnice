import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic'
import {Suspense, useEffect, useState} from "react";
import LoadingSpinner from "../../components/utils/LoadingSpinner";

const ChooseCorrectAnswer = dynamic(() => import('../../components/games/ChooseCorrectAnswer'), {
    suspense: true
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
            <main>
                <NavBar
                    activeRoute={'/class/eight'}
                    imgPath={'/android-chrome-512x512.png'}
                />
                <div className={'container-fluid'}>
                    <h1>osmá třída</h1>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <ChooseCorrectAnswer
                            game={game}
                        />
                    </Suspense>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default EightClass