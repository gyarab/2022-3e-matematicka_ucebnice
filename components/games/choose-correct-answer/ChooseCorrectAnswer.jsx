/**
 * CHOOSE CORRECT ANSWER GAME
 *
 * This game renders some question based on props, and renders a bunch of buttons with possible answers and one correct
 * answer, which is one of them. User answers by clicking on the button.
 *
 * - question: is question that is asked (string)
 * - answers: possible answers (array of strings)
 * - correctAnswer: correct answer that should be one of the answers from answers array (string)
 * - helperText: text which clarifies the question (string)
 * - equation: text representing some equation, that should be used with math questions (text)
 *
 * @param question
 * @param answers
 * @param correctAnswer
 * @param helperText
 * @param equation
 * @returns {JSX.Element}
 * @constructor
 */
import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import {useEffect, useState} from "react";
import gameStyles from '../../../styles/games/Game.module.css'
import {dangerColor, successColor} from "../../../lib/frontend-env-variables";
import GameNav from "../GameNav";

// question, answers, correctAnswer, helperText, equation
const ChooseCorrectAnswer = ({game}) => {
    const [stageNumber, setStageNumber] = useState(0)
    const [attempts, setAttempts] = useState(0)

    /*
    TODO -> component design
    TODO -> equation (how to format equation in html-react)
    TODO -> correct answer handler
    TODO -> score saving
     */

    const [windowWidth, setWindowWidth] = useState(0)
    const [buttonStyling, setButtonStyling] = useState({
        answer: null,
        styling: {}
    })

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)
    }, [])

    const handleAnswerSubmit = (answer) => {
        // if button clicked more than once ->  return because nothing changed
        if (answer === buttonStyling.answer)
            return

        setAttempts(prevState => prevState + 1)

        if (answer === game[stageNumber].correctAnswer) {
            setButtonStyling({
                answer: answer,
                styling: {
                    backgroundColor: successColor,
                    borderColor: successColor,
                    color: 'white'
                }
            })
            console.log('correct')
            setTimeout(handleNextStage, 1000)
        } else {
            setButtonStyling({
                answer: answer,
                styling: {
                    backgroundColor: dangerColor,
                    borderColor: dangerColor,
                    color: 'white'
                }
            })
            console.log('incorrect')
        }
    }

    const handlePreviousStage = () => {
        if (stageNumber === 0)
            setStageNumber(game.length - 1)
        else {
            setStageNumber(prevState => {
                return prevState - 1
            })
        }
    }

    const handleNextStage = () => {
        setStageNumber(prevState => {
            return (prevState + 1) % game.length
        })
    }

    const renderGame = (localGameNumber) => {
        const gameStage = game[localGameNumber]

        if (gameStage.autogenerate) {
            return (
                <div className={`${gameStyles.frame} mb-4`}>
                    <div className={gameStyles.mainContentContainer}>
                        <div className={gameStyles.buttonGroup}>
                            <Button variant={"info"} type={'button'} className={`${gameStyles.button} m-2`}
                                    onClick={handlePreviousStage}>Předchozí</Button>
                            <Button variant={"info"} type={'button'} className={`${gameStyles.button} m-2`}
                                    onClick={handleNextStage}>Další</Button>
                        </div>
                        <div className={gameStyles.mainContentContainer}>
                            autogen
                        </div>
                    </div>
                </div>
            )
        }

        const popover = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Nápověda</Popover.Header>
                <Popover.Body>
                    {gameStage.helperText}
                </Popover.Body>
            </Popover>
        )

        return (
            <div className={`${gameStyles.frame} mb-4`}>
                <div className={gameStyles.mainContentContainer}>
                    <GameNav
                        handleNextStage={handleNextStage}
                        handlePreviousStage={handlePreviousStage}
                    />
                    <div className={gameStyles.mainContentContainer}>
                        <OverlayTrigger
                            trigger={(windowWidth > 500) ? ['hover', 'focus'] : ['click']}
                            placement={'bottom'}
                            overlay={popover}
                        >
                            <Button
                                className={'m-2'}
                                style={{color: 'white'}}
                                variant={"secondary"}
                            >
                                {gameStage.question}
                            </Button>
                        </OverlayTrigger>
                        <div>
                            {gameStage.answers.map((answer, index) => {
                                return (
                                    <Button
                                        key={index}
                                        variant={"outline-secondary"}
                                        className={`m-2`}
                                        style={answer === buttonStyling.answer ? buttonStyling.styling : {}}
                                        onClick={() => handleAnswerSubmit(answer)}
                                    >
                                        {answer}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={gameStyles.gameContainer}>
            {
                renderGame(stageNumber)
            }
        </div>
    )
}

export default ChooseCorrectAnswer