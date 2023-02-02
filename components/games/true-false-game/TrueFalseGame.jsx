import {generateEqualPairs, getRandomBoolean} from "../../../lib/equationGeneration";
import {useEffect, useMemo, useState} from "react";
import gameStyles from "../../../styles/games/Game.module.css";
import gameUtilsStyles from '../../../styles/games/GameUtils.module.css'
import trueFalseGameStyles from '../../../styles/games/TrueFalseGame.module.css'
import GameNav from "../GameNav";
import {Button, OverlayTrigger, Popover} from "react-bootstrap";

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Tip</Popover.Header>
        <Popover.Body>
            {"Zjistěte, zda je výsledek tohoto příkladu spávný, a klikněte na odpovídající tlačítko"}
        </Popover.Body>
    </Popover>
)

const TrueFalseGame = ({size, difficulty}) => {
    /*
    TODO -> opravit border u tlačítek na zvolení správně/špatně
    TODO -> promyslet lepší označení správně/špatně tlačítek
     */

    const pairs = useMemo(() => generatePairArray(generateEqualPairs(size, difficulty)), [size, difficulty]);
    const [stage, setStage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [evaluation, setEvaluation] = useState(undefined);
    const [mistakes, setMistakes] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)
    }, [])

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
        if (stage !== pairs.length - 1) {
            setEvaluation(undefined)
            setStage(prevState => {
                return (prevState + 1) % pairs.length
            })
        }
    }

    const handlePreviousStage = () => {
        if (stage !== 0) {
            setEvaluation(undefined)
            setStage(prevState => {
                return prevState - 1
            })
        }
    }

    const handleAnswerSubmit = (e) => {
        const buttonText = e.target.innerHTML
        const isDisplayedKey = pairs[stage].keyValue === pairs[stage].displayedValue

        if (buttonText === 'správně') {
            if (isDisplayedKey) {
                console.log('correct')
                setEvaluation({
                    isCorrect: true,
                    isCorrectButton: true
                })
                pairs[stage].isCorrect = true
                pairs[stage].isCorrectButton = true
                setTimeout(handleNextStage, 1000)
            } else {
                console.log('incorrect')
                if (evaluation === undefined || pairs[stage].isCorrect === undefined) {
                    setMistakes(prevState => {
                        return prevState + 1
                    })
                } else if (evaluation.isCorrect || pairs[stage].isCorrect) {
                    setMistakes(prevState => {
                        return prevState + 1
                    })
                }
                setEvaluation({
                    isCorrect: false,
                    isCorrectButton: true
                })
                pairs[stage].isCorrect = false
                pairs[stage].isCorrectButton = true
            }
        } else {
            if (isDisplayedKey) {
                console.log('incorrect')
                if (evaluation === undefined || pairs[stage].isCorrect === undefined) {
                    setMistakes(prevState => {
                        return prevState + 1
                    })
                } else if (evaluation.isCorrect || pairs[stage].isCorrect) {
                    setMistakes(prevState => {
                        return prevState + 1
                    })
                }

                setEvaluation({
                    isCorrect: false,
                    isCorrectButton: false
                })
                pairs[stage].isCorrect = false
                pairs[stage].isCorrectButton = false
            } else {
                console.log('correct')
                setEvaluation({
                    isCorrect: true,
                    isCorrectButton: false
                })
                pairs[stage].isCorrect = true
                pairs[stage].isCorrectButton = false

                setTimeout(handleNextStage, 1300)
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
                <div className={gameStyles.mainContentContainer}>
                    <OverlayTrigger
                        trigger={(windowWidth > 500) ? ['hover', 'focus'] : ['click']}
                        placement={'bottom'}
                        overlay={popover}
                        defaultShow={false}
                    >
                        <Button
                            className={'m-2'}
                            style={{color: 'white'}}
                            variant={"secondary"}
                        >
                            {`${pairs[stage].value} = ${pairs[stage].displayedValue}`}
                        </Button>
                    </OverlayTrigger>
                    <div className={`d-flex flex-row`}>
                        <Button
                            variant={"outline-secondary"}
                            style={{width: '5rem'}}
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
                                ${correctButton || previousCorrectButton ? trueFalseGameStyles.button : ''}`
                            }
                            onClick={handleAnswerSubmit}
                        >
                            {"správně"}
                        </Button>
                        <Button
                            variant={"outline-secondary"}
                            style={{width: '5rem'}}
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
                                ${notCorrectButton || previousNotCorrectButton ? trueFalseGameStyles.button : ''}`
                            }
                            onClick={handleAnswerSubmit}
                        >
                            {"špatně"}
                        </Button>
                    </div>
                </div>
            </div>
            {
                `Mistakes: ${mistakes}!`
            }
        </>
    )
}

export default TrueFalseGame