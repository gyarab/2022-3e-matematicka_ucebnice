import {useState, useMemo} from "react";
import {generatePexeso} from "../../../lib/equationGeneration";
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
    const pexeso = useMemo(() => generatePexeso(size, difficulty), [size, difficulty]);
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

    function generatePexArray() {
        let inArr = []
        for (const [key, value] of pexeso) {
            inArr.push({
                value: value,
                isKey: false
            })
            inArr.push({
                value: key,
                isKey: true
            })
        }

        const chunkSize = size;

        inArr = inArr.reduce((acc, item) => {
            let group = acc.pop();
            if (group.length === chunkSize) {
                acc.push(group);
                group = [];
            }
            group.push(item);
            acc.push(group);
            return acc;
        }, [[]])
        return inArr
    }

    const setNewEvaluation = (correct=false, card1='', card2='') => {
        setEvaluation({
            correct: correct,
            card1: card1,
            card2: card2
        })
    }

    const setNewMarkedMap = (key, value) => {
        setMarked(prevState => {
            return [...prevState, key, value]
        })
    }

    const cardChosen = (value, isKey) => {
        if (marked.includes(value))
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
                console.log('incorrect')
            } else if (flipped.isKey) {
                // first is key
                if (pexeso.get(flipped.value) === value) {
                    setNewEvaluation(true, flipped.value, value)
                    setNewMarkedMap(flipped.value, value)
                    console.log('correct')
                } else {
                    setNewEvaluation(false, flipped.value, value)
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
            <div className={`p-3 m-2 ${gameStyles.frame}`} style={{width: 'fit-content'}}>
                {
                    pexArray.map((row, index) => {
                        return (
                            <Row key={index} className={'align-items-center justify-content-center ps-2 pe-2'}>
                                {
                                    row.map((card, idx) => {
                                        let correct = null
                                        let neutral = false
                                        if (evaluation.card1 === card.value || evaluation.card2 === card.value)
                                            correct = evaluation.correct

                                        if (marked.includes(card.value))
                                            neutral = true

                                        return (
                                            <PexesoCard
                                                key={idx}
                                                correct={correct}
                                                neutral={neutral}
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

            {
                marked.length === pexArray.length &&
                <GameEndModal
                    show={showModal}
                    onHide={hideEndModalHandler}
                />
            }
        </>

    )
}

export default Pexeso
