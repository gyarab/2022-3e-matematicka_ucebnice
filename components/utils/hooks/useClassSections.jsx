import {useMemo} from "react";

export const useClassSections = (url) => {
    console.log(url)

    return useMemo(() =>
        [
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
                        id: 2,
                        title: 'Pexeso.jsx',
                        size: 4, // should not be even
                        difficulty: 4
                    },
                    {
                        id: 3,
                        title: 'CardFlipper.jsx',
                        size: 4,
                        difficulty: 4
                    },
                    {
                        id: 4,
                        title: 'TrueFalseGame.jsx',
                        size: 4,
                        difficulty: 4
                    },
                    {
                        id: 5,
                        title: 'SorterGame.jsx',
                        gameLength: 3,
                        size: 4,
                        difficulty: 4
                    }
                ]
            },
            {
                title: '',
                games: [
                    {
                        id: 0,
                    }
                ]
            }
        ]
    )
}