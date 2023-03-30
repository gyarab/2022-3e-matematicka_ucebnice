import {useMemo, useState} from "react";
import {generateEqualPairs} from "../../../lib/equationGeneration";
import {Row} from "react-bootstrap";
import gameStyles from "../../../styles/games/Game.module.css";
import dynamic from "next/dynamic";

const PexesoCard = dynamic(() => import("./PexesoCard"), {
    ssr: false
})
const GameEndModal = dynamic(() => import("../GameEndModal"), {
    ssr: false
})

const Pexeso = ({size, difficulty}) => {
    /*
        TODO -> vygenerování nového hracího pole
        TODO -> mobile design
     */
    const pexeso = useMemo(() => generateEqualPairs(size, difficulty), [size, difficulty]);
    const pexArray = useMemo(() => generatePexArray(), []);
    const [flipped, setFlipped] = useState({
        value: undefined,
        isKey: undefined
    })
    const [evaluation, setEvaluation] = useState({
        correct: false,
        card1: '',
        card2: ''
    });
    const [marked, setMarked] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [mistakes, setMistakes] = useState(0);

    function generatePexArray() {
        let entriesArray = []
        for (const [key, value] of pexeso) {
            entriesArray.push({
                value: value,
                isKey: false
            })
            entriesArray.push({
                value: key,
                isKey: true
            })
        }

        // shuffle cards
        entriesArray = entriesArray.sort((a, b) => Math.random() - 0.5)

        const chunkSize = size;

        entriesArray = entriesArray.reduce((acc, item) => {
            let group = acc.pop();
            if (group.length === chunkSize) {
                acc.push(group);
                group = [];
            }
            group.push(item);
            acc.push(group);
            return acc;
        }, [[]])

        return entriesArray
    }

    const setNewEvaluation = (correct = false, card1 = '', card2 = '') => {
        setEvaluation({
            correct: correct,
            card1: card1,
            card2: card2
        })
    }

    const setNewMarkedMap = (key, value) => {
        setMarked(prevState => [...prevState, key, value])

        if (marked.length + 2 === size ** 2)
            setShowModal(true)
    }

    const cardChosen = (value, isKey) => {
        if (marked.includes(value) || flipped.value === value)
            return

        if (flipped.value === undefined) {
            setNewEvaluation()
            setFlipped({
                value: value,
                isKey: isKey
            })
        } else {
            const bothAreKeys = flipped.isKey && isKey
            if (bothAreKeys) {
                setNewEvaluation(false, flipped.value, value)
                setMistakes(prevState => prevState + 1)
                console.log('incorrect')
            } else if (flipped.isKey) {
                // first is key

                if (pexeso.get(flipped.value) === value) {
                    setNewEvaluation(true, flipped.value, value)
                    setNewMarkedMap(flipped.value, value.toString())
                    console.log('correct')
                } else {
                    setNewEvaluation(false, flipped.value, value)
                    setMistakes(prevState => prevState + 1)
                    console.log('incorrect')
                }
            } else {
                // second is key
                if (pexeso.get(value) === flipped.value) {
                    setNewEvaluation(true, flipped.value, value)
                    setNewMarkedMap(value, flipped.value)
                    console.log('correct')
                } else {
                    setNewEvaluation(false, flipped.value, value)
                    setMistakes(prevState => prevState + 1)
                    console.log('incorrect')
                }
            }

            setFlipped({
                value: undefined,
                isKey: undefined
            })
        }
    }

    const hideEndModalHandler = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className={`${gameStyles.frame}`} style={{width: 'fit-content'}}>
                {
                    pexArray.map((row, index) => {
                        return (
                            <Row key={index} className={'align-items-center justify-content-center ps-2 pe-2'}>
                                {
                                    row.map((card, idx) => {
                                        let correct = null
                                        let neutral = false
                                        let checked = false

                                        if (evaluation.card1 === card.value || evaluation.card2 === card.value)
                                            correct = evaluation.correct

                                        if (marked.includes(card.value))
                                            neutral = true

                                        if (flipped.value === card.value)
                                            checked = true

                                        return (
                                            <PexesoCard
                                                key={idx}
                                                correct={correct}
                                                neutral={neutral}
                                                checked={checked}
                                                value={card.value}
                                                clickHandler={(e) => cardChosen(e.target.innerHTML, card.isKey)}
                                            />
                                        )
                                    })
                                }
                            </Row>
                        )
                    })
                }
            </div>
            <GameEndModal
                show={showModal}
                title={"Game end"}
                text={`Congratulations, during the game you have made ${mistakes} mistakes only!`}
                onHide={hideEndModalHandler}
            />
        </>
    )
}

export default Pexeso
