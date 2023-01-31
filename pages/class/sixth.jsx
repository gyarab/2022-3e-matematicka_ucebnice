import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight, heroImageAltText, heroImagePath} from "../../lib/frontend-env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import Section from "../../components/classes/Section";
import classStyles from '../../styles/Class.module.css'
import HeroImage from "../../components/classes/HeroImage";

/**
 * GAME IDs
 *
 * - 1 -> choose correct answer game
 * - 2 -> ??
 */

const sections = [
    {
        title: 'Základní počty',
        games: [
            {
                id: 1,
                title: 'ChooseCorrectAnswer.jsx',
                content: [
                    {
                        gameId: 0,
                        autogenerate: false,
                        question: 'Kolik je 1+1?',
                        answers: ['2', '3', '8'],
                        correctAnswer: '2',
                        helperText: 'Pokud budu mít jedno jablko a přidám ještě jedno, kolik jich budu mít?', // if not stated -> null; otherwise string
                        equation: null, // if not stated -> null; otherwise string
                    },
                    {
                        gameId: 1,
                        autogenerate: true,
                        difficulty: 1,
                    }
                ]
            },
            {
                id: 1,
                title: 'ChooseCorrectAnswer.jsx',
                content: [
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
            },
            {
                id: 2,
                title: 'Pexeso.jsx',
                size: 4, // should not be even
                difficulty: 2
            },
            {
                id: 3,
                title: 'CardFlipper.jsx',
                size: 4,
                difficulty: 2
            }
        ]
    },
    {
        title: '',
        games: [
            {
                id: 0,
                title: '',
                content: []
            }
        ]
    }
]
const SixthClass = ({}) => {
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
                        {sections.map((section, index) => {
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