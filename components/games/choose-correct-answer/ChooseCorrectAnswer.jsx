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

const defaultStyling = {
    answer: null,
    styling: {}
}

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
const ChooseCorrectAnswer = ({gameLength, size, difficulty}) => {
    /*
        TODO -> component design
        TODO -> equation (how to format equation in html-react)
        TODO -> score storage
        TODO -> disable to get to another gameStage after completing the game
        TODO -> mobile design
     */

    const [windowWidth, setWindowWidth] = useState(0)
    const [buttonStyling, setButtonStyling] = useState(defaultStyling)
    const [game, setGame] = useState([]);
    const [stage, setStage] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [modalShow, setModalShow] = useState(false)

    const setNewGameStage = (nextStage) => {
        setGame(prevState => {
            prevState[nextStage] = generateEquation(size, difficulty)
            return [...prevState]
        })
    }

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)

        setNewGameStage(0)
    }, []);

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
        setStage(prevState => prevState - 1)
    }

    const handleNextStage = () => {
        setButtonStyling(defaultStyling)
        setStage(prevState => {
            const nextStage = (prevState + 1) % gameLength
            if (typeof game[nextStage] === 'undefined')
                setNewGameStage(nextStage)

            return nextStage
        })
    }

    const readyToRender = typeof game[stage] !== "undefined"
    return (
        <>
            <div className={`${gameStyles.frame} m-2`}>
                <GameNav
                    showPreviousButton={stage !== 0}
                    showNextButton={stage !== gameLength - 1}
                    handleNextStage={handleNextStage}
                    handlePreviousStage={handlePreviousStage}
                />
                <div className={gameStyles.mainContentContainer}>
                    <Button
                        className={'m-2'}
                        style={{color: 'white'}}
                        variant={"secondary"}
                    >
                        {
                            readyToRender ? game[stage].question : ''
                        }
                    </Button>
                    <div>
                        {readyToRender && game[stage].answers.map((answer, index) => {
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