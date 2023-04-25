import {useEffect, useState} from "react";

export const useClassSections = (url) => {
    const [classSections, setClassSections] = useState([]);

    useEffect(() => {
        setClassSections(
            [
                {
                    title: 'Základní počty',
                    games: [
                        {
                            id: 1,
                            title: 'ChooseCorrectAnswer.jsx',
                            gameLength: 2,
                            size: 5,
                            difficulty: 3
                        },
                        {
                            id: 2,
                            title: 'Pexeso.jsx',
                            size: 4, // should not be even
                            difficulty: 1
                        },
                        {
                            id: 3,
                            title: 'CardFlipper.jsx',
                            size: 4,
                            difficulty: 1
                        },
                        {
                            id: 4,
                            title: 'TrueFalseGame.jsx',
                            size: 4,
                            difficulty: 1
                        },
                        {
                            id: 5,
                            title: 'SorterGame.jsx',
                            gameLength: 3,
                            size: 3,
                            difficulty: 4
                        },
                        {
                            id: 6,
                            title: 'Geometry.jsx',
                            difficulty: 2,
                            size: 5,
                        },

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
    }, [url]);

    return classSections
}