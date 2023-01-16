import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import {useEffect, useState} from "react";
import gameStyles from '../../../styles/games/Game.module.css'
import {dangerColor, successColor} from "../../../lib/frontend-env-variables";
import GameNav from "../GameNav";
import {generateEquation} from "../../../lib/equationGeneration";
import dynamic from 'next/dynamic'

const GameEndModal = dynamic(() => import('../GameEndModal'), {
    ssr: false
})

/**
 * CHOOSE CORRECT ANSWER GAME
 *
 * This game renders some question based on props, and renders a bunch of buttons with possible answers and one correct
 * answer, which is one of them. User answers by clicking on the button.
 *
 * @param game
 * @returns {JSX.Element}
 * @constructor
 */
const ChooseCorrectAnswer = ({game}) => {
    const [stageNumber, setStageNumber] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [modalShow, setModalShow] = useState(false)

    /*
    TODO -> component design
    TODO -> equation (how to format equation in html-react)
    TODO -> score saving
    TODO -> disable to get to another gameStage after completing the game
     */

    const defaultStyling = {
        answer: null,
        styling: {}
    }
    const [windowWidth, setWindowWidth] = useState(0)
    const [buttonStyling, setButtonStyling] = useState(defaultStyling)

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)
    }, [])

    const handleAnswerSubmit = (answer, correctAnswer) => {
        // if button clicked more than once ->  return because nothing changed
        if (answer === buttonStyling.answer)
            return

        setAttempts(prevState => prevState + 1)

        if (answer === correctAnswer) {
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
        setButtonStyling(defaultStyling)
        if (stageNumber !== 0) {
            setStageNumber(prevState => {
                return prevState - 1
            })
        }
    }

    const handleNextStage = () => {
        setButtonStyling(defaultStyling)
        setStageNumber(prevState => {
            if (prevState === game.length - 1)
                setModalShow(true)

            return (prevState + 1) % game.length
        })
    }

    const renderGame = (localGameNumber) => {
        const gameStage = game[localGameNumber]

        if (gameStage.autogenerate) {
            const task = generateEquation(4, gameStage.difficulty);

            return (
                <div className={`${gameStyles.frame}`}>
                    <GameNav
                        handleNextStage={handleNextStage}
                        handlePreviousStage={handlePreviousStage}
                    />
                    <div className={gameStyles.mainContentContainer}>
                        <Button
                            className={'m-2'}
                            style={{color: 'white'}}
                            variant={"secondary"}
                        >
                            {task.question}
                        </Button>
                        <div>
                            {task.answers.map((answer, index) => {
                                return (
                                    <Button
                                        key={index}
                                        variant={"outline-secondary"}
                                        className={`m-2`}
                                        style={answer === buttonStyling.answer ? buttonStyling.styling : {}}
                                        onClick={() => handleAnswerSubmit(answer, task.correctAnswer)}
                                    >
                                        {answer}
                                    </Button>
                                )
                            })}
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
            <div className={`${gameStyles.frame}`}>
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
                                    onClick={() => handleAnswerSubmit(answer, game[stageNumber].correctAnswer)}
                                >
                                    {answer}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={`p-2 mb-3 ${gameStyles.gameContainer}`}>
                {
                    renderGame(stageNumber)
                }
            </div>
            <GameEndModal
                title={'Modal title'}
                text={'Lorem ipsum'}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default ChooseCorrectAnswer