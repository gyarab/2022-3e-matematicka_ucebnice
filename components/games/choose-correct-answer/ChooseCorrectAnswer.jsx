import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import gameStyles from '../../../styles/games/Game.module.css'
import gameUtilsStyles from '../../../styles/games/GameUtils.module.css'
import trueFalseGameStyles from '../../../styles/games/TrueFalseGame.module.css'
import chooseCorrectAnswerStyles from '../../../styles/games/ChooseCorrectAnswer.module.css'
import GameNav from "../GameNav";
import {generateEquation} from "../../../lib/generation/equationGeneration.js";
import dynamic from 'next/dynamic'
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

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
const ChooseCorrectAnswer = ({gameLength, size, difficulty, email}) => {
    /*
        TODO -> component design
        TODO -> equation (how to format equation in html-react)
        TODO -> score storage
     */

    const [game, setGame] = useState([]);
    const [stage, setStage] = useState(0)
    const [evaluation, setEvaluation] = useState(undefined);
    const [attempts, setAttempts] = useState(0)
    const [modalShow, setModalShow] = useState(false)

    const setGameUsingStage = (stage, isNew = true, evaluation = undefined) => {
        setGame(prevState => {
            if (isNew) {
                prevState[stage] = {
                    ...generateEquation(size, difficulty),
                    evaluation: evaluation
                }
            } else {
                prevState[stage] = {
                    ...prevState[stage],
                    evaluation: evaluation
                }
            }

            return [...prevState]
        })
    }

    useEffect(() => {
        axios.post('/api/games/getGameStage', {
            ...email,
            gameId: 1
        }).then(res =>
            console.log(res)
        ).catch(async (err) => {
            console.log(err.response.data)
        })

        setGameUsingStage(0)
    }, []);

    const handleAnswerSubmit = (answer) => {
        // if button clicked more than once ->  return because nothing changed
        if (evaluation !== undefined && answer === evaluation.answer)
            return

        setAttempts(prevState => prevState + 1)

        if (answer === game[stage].correctAnswer) {
            setGameUsingStage(stage, false, {
                answer: answer,
                isCorrect: true
            })
            console.log('correct')
            if (stage !== gameLength - 1)
                setTimeout(handleNextStage, 1000)
        } else {
            setGameUsingStage(stage, false, {
                answer: answer,
                isCorrect: false
            })
            setAttempts(prevState => prevState + 1)
            console.log('incorrect')
        }
    }

    const handlePreviousStage = () => {
        setEvaluation(undefined)
        setStage(prevState => prevState - 1)
    }

    const handleNextStage = () => {
        setEvaluation(undefined)
        setStage(prevState => {
            const nextStage = (prevState + 1) % gameLength
            if (typeof game[nextStage] === 'undefined')
                setGameUsingStage(nextStage)

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
                <div
                    className={`w-100 d-flex flex-column align-items-center justify-content-center ${gameStyles.mainContentContainer}`}
                >
                    <Button
                        className={'m-2'}
                        variant={"secondary"}
                    >
                        {
                            readyToRender ? game[stage].question : ''
                        }
                    </Button>
                    <div className={`w-100 d-flex flex-wrap justify-content-center`}>
                        {readyToRender && game[stage].answers.map((answer, index) => {
                            const resultCheckable = game[stage].evaluation !== undefined && game[stage].evaluation.answer === answer

                            return (
                                <Button
                                    key={index}
                                    variant={"outline-secondary"}
                                    className={`
                                        m-2
                                        ${resultCheckable ? game[stage].evaluation.isCorrect ? gameUtilsStyles.correct : gameUtilsStyles.incorrect : ''}
                                        ${resultCheckable ? trueFalseGameStyles.checkedButton : ''}
                                        ${chooseCorrectAnswerStyles.button}`
                                    }
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