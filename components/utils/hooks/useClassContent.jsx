import {useEffect, useState} from "react";

export const useClassContent = (url) => {
    const [classContent, setClassContent] = useState([]);

    useEffect(() => {
        setClassContent(
            [
                {
                    id: 1,
                    title: 'Volba správné odpovědi',
                    gameLength: 2,
                    size: 3,
                    difficulty: 1
                },
                {
                    id: 2,
                    title: 'Hledání dvojic',
                    size: 4, // should not be even
                    difficulty: 1
                },
                {
                    id: 4,
                    title: 'Pravda nebo lež',
                    size: 4,
                    difficulty: 1
                },
                {
                    id: 3,
                    title: 'Otáčení kartiček',
                    size: 4,
                    difficulty: 1
                },
                {
                    id: 5,
                    title: 'Řazení kartiček',
                    size: 3,
                    difficulty: 1
                },
                {
                    id: 6,
                    title: 'Práce s trojúhelníky',
                    difficulty: 2,
                    size: 5,
                },
            ]
        )
    }, [url]);

    return classContent
}