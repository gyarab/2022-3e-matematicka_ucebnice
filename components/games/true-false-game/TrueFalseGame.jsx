import {getRandomBoolean} from "../../../lib/generation/equationGeneration.js";
import React, {useEffect, useState} from "react";
import gameStyles from "../../../styles/games/Game.module.css";
import gameUtilsStyles from '../../../styles/games/GameUtils.module.css'
import trueFalseGameStyles from '../../../styles/games/TrueFalseGame.module.css'
import GameNav from "../GameNav";
import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import {BsFillCheckCircleFill, BsXCircleFill} from 'react-icons/bs'
import axios from "axios";
import {reviver} from "../../../lib/utils/utils";

const title = 'Tip'
const text = 'Zjistěte, zda je výsledek tohoto příkladu spávný, a klikněte na odpovídající tlačítko!'

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">{title}</Popover.Header>
        <Popover.Body>
            {text}
        </Popover.Body>
    </Popover>
)

const TrueFalseGame = ({size, difficulty, email}) => {
    /*
    TODO -> opravit border u tlačítek na zvolení správně/špatně
    TODO -> promyslet lepší označení správně/špatně tlačítek
     */

    //const pairs = useMemo(() => generatePairArray(generateEqualPairs(size, difficulty)), [size, difficulty]);
    const [pairs, setPairs] = useState([{
        keyValue: '',
        value: '',
        displayedValue: '',
        isCorrectButton: undefined,
        isCorrect: undefined
    }]);
    const [stage, setStage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [evaluation, setEvaluation] = useState(undefined);
    const [mistakes, setMistakes] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)

        getNewTrueFalsePairs()
    }, [])

    const setNewScore = (incorrect, correct) => {
        axios.post('/api/user/score/addScore', {
            ...email,
            incorrect: incorrect,
            correct: correct,
            gameId: 4
        }).then(r => {
            console.log('added score')
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    function getNewTrueFalsePairs() {
        axios.post('/api/games/getEqualPairs', {
            ...email,
            difficulty: 1,
            size: 5,
            gameId: 3
        }).then(response => {
            //console.log(response)
            response.data.pairs = JSON.parse(response.data.pairs, reviver)
            setPairs(generatePairArray(response.data.pairs))
        }).catch(err => {
            console.log(err)
        })
    }

    function generatePairArray(pairMap) {
        let pairArr = []
        for (const [key, value] of pairMap) {
            const randomInt = Math.floor(Math.random() * 5 + 1)
            const keyNumber = Number.parseInt(key)

            pairArr.push({
                keyValue: key,
                value: value,
                displayedValue: getRandomBoolean() ? key : (getRandomBoolean() ? `${keyNumber - randomInt}` : `${keyNumber + randomInt}`),
                isCorrectButton: undefined,
                isCorrect: undefined
            })
        }

        return pairArr
    }

    const handleNextStage = () => {
        setEvaluation(undefined)
        setStage(prevState => (prevState + 1) % pairs.length)
    }

    const handlePreviousStage = () => {
        setEvaluation(undefined)
        setStage(prevState => (prevState - 1))

    }

    const handleAnswerSubmit = (isCorrectButton) => {
        if (evaluation !== undefined && ((isCorrectButton && evaluation.isCorrectButton) || (!isCorrectButton && !evaluation.isCorrectButton)))
            return

        const isDisplayedKey = pairs[stage].keyValue === pairs[stage].displayedValue

        if (isCorrectButton) {
            if (isDisplayedKey) {
                // correct
                setNewScore(0, 1)
                setEvaluation({
                    isCorrect: true,
                    isCorrectButton: true
                })
                pairs[stage].isCorrect = true
                pairs[stage].isCorrectButton = true

                if (stage !== pairs.length - 1)
                    setTimeout(handleNextStage, 1300)
            } else {
                // incorrect
                setNewScore(1, 0)
                setMistakes(prevState => prevState + 1)
                setEvaluation({
                    isCorrect: false,
                    isCorrectButton: true
                })
                pairs[stage].isCorrect = false
                pairs[stage].isCorrectButton = true
            }
        } else {
            if (isDisplayedKey) {
                // incorrect
                setNewScore(1, 0)
                setMistakes(prevState => prevState + 1)
                setEvaluation({
                    isCorrect: false,
                    isCorrectButton: false
                })
                pairs[stage].isCorrect = false
                pairs[stage].isCorrectButton = false
            } else {
                // correct
                setNewScore(0, 1)
                setEvaluation({
                    isCorrect: true,
                    isCorrectButton: false
                })
                pairs[stage].isCorrect = true
                pairs[stage].isCorrectButton = false

                if (stage !== pairs.length - 1)
                    setTimeout(handleNextStage, 1000)
            }
        }
    }

    const resultCheckable = evaluation !== undefined
    const correctButton = resultCheckable && evaluation.isCorrectButton
    const notCorrectButton = resultCheckable && !evaluation.isCorrectButton

    const previousCheckable = pairs[stage].isCorrect !== undefined && pairs[stage].isCorrectButton !== undefined
    const previousCorrectButton = previousCheckable && pairs[stage].isCorrectButton
    const previousNotCorrectButton = previousCheckable && !pairs[stage].isCorrectButton

    return (
        <>
            <div className={`${gameStyles.frame} m-2`}>
                <GameNav
                    showPreviousButton={stage !== 0}
                    showNextButton={stage !== pairs.length - 1}
                    handleNextStage={handleNextStage}
                    handlePreviousStage={handlePreviousStage}
                />
                <div
                    className={`w-100 d-flex flex-column align-items-center justify-content-center ${gameStyles.mainContentContainer}`}>
                    <OverlayTrigger
                        trigger={(windowWidth > 500) ? ['hover', 'focus'] : ['click']}
                        placement={'bottom'}
                        overlay={popover}
                        defaultShow={false}
                    >
                        <Button
                            className={'m-2'}
                            variant={"secondary"}
                        >
                            {`${pairs[stage].value} = ${pairs[stage].displayedValue}`}
                        </Button>
                    </OverlayTrigger>
                    <div className={`d-flex flex-row`}>
                        <Button
                            variant={"outline-secondary"}
                            className={`
                                d-flex
                                justify-content-center
                                align-items-center
                                hoverDarkShadow
                                m-2
                                ${
                                correctButton ? (evaluation.isCorrect ? gameUtilsStyles.correct : gameUtilsStyles.incorrect) :
                                    previousCorrectButton ? (pairs[stage].isCorrect ? gameUtilsStyles.correct : gameUtilsStyles.incorrect) : ''
                            }
                                ${correctButton || previousCorrectButton ? trueFalseGameStyles.checkedButton : ''}
                                ${trueFalseGameStyles.button}`
                            }
                            onClick={() => handleAnswerSubmit(true)}
                        >
                            <BsFillCheckCircleFill/>
                        </Button>
                        <Button
                            variant={"outline-secondary"}
                            className={`
                                d-flex
                                justify-content-center
                                align-items-center
                                hoverDarkShadow
                                m-2
                                ${
                                notCorrectButton ? (evaluation.isCorrect ? gameUtilsStyles.correct : gameUtilsStyles.incorrect) :
                                    previousNotCorrectButton ? (pairs[stage].isCorrect ? gameUtilsStyles.correct : gameUtilsStyles.incorrect) : ''
                            }
                                ${notCorrectButton || previousNotCorrectButton ? trueFalseGameStyles.checkedButton : ''}
                                ${trueFalseGameStyles.button}`
                            }
                            onClick={() => handleAnswerSubmit(false)}
                        >
                            <BsXCircleFill/>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrueFalseGame