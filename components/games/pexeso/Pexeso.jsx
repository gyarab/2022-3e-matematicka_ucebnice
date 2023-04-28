import {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import gameStyles from "../../../styles/games/Game.module.css";
import dynamic from "next/dynamic";
import {shuffleArray} from "../../../lib/generation/equationGeneration";
import axios from "axios";
import {reviver} from "../../../lib/utils/utils";

const PexesoCard = dynamic(() => import("./PexesoCard"), {
    ssr: false
})
const GameEndModal = dynamic(() => import("../GameEndModal"), {
    ssr: false
})

const Pexeso = ({size, difficulty, email}) => {
    /*
        TODO -> vygenerování nového hracího pole
        TODO -> mobile design
     */

    const [pexeso, setPexeso] = useState([]);
    const [pexArray, setPexArray] = useState([]);
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

    useEffect(() => {
        getNewPexesoGame()
    }, []);

    const setNewScore = (incorrect, correct) => {
        axios.post('/api/user/score/add', {
            ...email,
            incorrect: incorrect,
            correct: correct,
            gameId: 2
        }).then(r => {
            console.log('added score')
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    function getNewPexesoGame() {
        axios.post('/api/games/getEqualPairs', {
            ...email,
            difficulty: difficulty,
            size: (size ** 2) / 2,
            gameId: 2
        }).then(response => {
            //console.log(response)
            response.data.pairs = JSON.parse(response.data.pairs, reviver)
            setPexeso(response.data.pairs)
            setPexArray(generatePexArray(response.data.pairs))
        }).catch(err => {
            console.log(err)
        })
    }

    function generatePexArray(pexeso) {
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
        entriesArray = shuffleArray(entriesArray)

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

        if (marked.length + 2 === size ** 2) {
            setShowModal(true)
            setNewEvaluation()
            setFlipped({
                value: undefined,
                isKey: undefined
            })
            setMarked([])
            setMistakes(0)
            getNewPexesoGame()
        }
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
                // incorrect
                setNewScore(1, 0)
                setNewEvaluation(false, flipped.value, value)
                setMistakes(prevState => prevState + 1)
            } else if (flipped.isKey) {
                // first is key

                if (pexeso.get(flipped.value) === value) {
                    // correct
                    setNewScore(0, 1)
                    setNewEvaluation(true, flipped.value, value)
                    setNewMarkedMap(flipped.value, value.toString())
                } else {
                    // incorrect
                    setNewScore(1, 0)
                    setNewEvaluation(false, flipped.value, value)
                    setMistakes(prevState => prevState + 1)
                }
            } else {
                // second is key
                if (pexeso.get(value) === flipped.value) {
                    // correct
                    setNewScore(0, 1)
                    setNewEvaluation(true, flipped.value, value)
                    setNewMarkedMap(value, flipped.value)
                } else {
                    // incorrect
                    setNewScore(1, 0)
                    setNewEvaluation(false, flipped.value, value)
                    setMistakes(prevState => prevState + 1)
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
        <div className={`w-100 d-flex flex-row align-items-center justify-content-center`}>
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
        </div>
    )
}

export default Pexeso
