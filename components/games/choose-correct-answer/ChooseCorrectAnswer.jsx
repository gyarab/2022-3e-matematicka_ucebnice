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
import {Button, OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import {useEffect, useState} from "react";
import gameStyles from '../../../styles/games/Game.module.css'
import ColoredButton from "./ColoredButton";


// question, answers, correctAnswer, helperText, equation
const ChooseCorrectAnswer = ({game}) => {
    const [gameNumber, setGameNumber] = useState(0)
    const [correct, setCorrect] = useState(false)

    /*
    TODO -> component design
    TODO -> equation (how to format equation in html-react)
    TODO -> correct answer handler
    TODO -> score saving
     */

    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)
    }, [])

    const handleAnswerSubmit = (e) => {
        const buttonAnswer = e.target.innerText.toString()

        if (buttonAnswer === game[gameNumber].correctAnswer) {
            setCorrect(true)
            e.target.style.backgroundColor = 'var(--bs-success)'
            e.target.style.borderColor = 'var(--bs-success)'
            e.target.style.color = 'white'
            console.log('correct')
        } else {
            e.target.style.backgroundColor = 'var(--bs-danger)'
            e.target.style.borderColor = 'var(--bs-danger)'
            e.target.style.color = 'white'
            console.log('incorrect')
        }
    }

    const handlePreviousStage = () => {
        if (gameNumber === 0)
            setGameNumber(game.length - 1)
        else {
            setGameNumber(prevState => {
                return prevState - 1
            })
            setStageAnswers([])
        }
    }

    const handleNextStage = () => {
        setGameNumber(prevState => {
            return (prevState + 1) % game.length
        })
        setStageAnswers([])
    }

    const renderGame = (localGameNumber) => {
        const gameStage = game[localGameNumber]

        if (gameStage.autogenerate) {
            return (
                <div className={gameStyles.frame}>
                    <div className={gameStyles.mainContentContainer}>
                        <div className={gameStyles.buttonGroup}>
                            <Button variant={"info"} type={'button'} className={`${gameStyles.button} m-2`} onClick={handlePreviousStage}>Předchozí</Button>
                            <Button variant={"info"} type={'button'} className={`${gameStyles.button} m-2`} onClick={handleNextStage}>Další</Button>
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
            <div className={gameStyles.frame}>
                <div className={gameStyles.mainContentContainer}>
                    <div className={gameStyles.buttonGroup}>
                        <Button variant={"info"} type={'button'} className={`${gameStyles.button} m-2`} onClick={handlePreviousStage}>Předchozí</Button>
                        <Button variant={"info"} type={'button'} className={`${gameStyles.button} m-2`} onClick={handleNextStage}>Další</Button>
                    </div>
                    <div className={gameStyles.mainContentContainer}>
                        <OverlayTrigger trigger={(windowWidth > 500) ? ['hover', 'focus'] : ['click']} placement={'bottom'} overlay={popover}>
                            <Button className={'m-2'} style={{color: 'white'}} variant={"secondary"}>{gameStage.question}</Button>
                        </OverlayTrigger>
                        <div>
                            {gameStage.answers.map((answer, index) => {
                                return (
                                    <ColoredButton
                                        key={index}
                                        id={answer.id}
                                        correctness={typeof stageAnswers === 'undefined' ? undefined : stageAnswers[index]}
                                        answer={answer.value}
                                        handleAnswerSubmit={(text, id) => handleAnswerSubmit(text, id)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className={gameStyles.contentContainer}>
                        {
                            // get some react icon (success + wrong)
                        }
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