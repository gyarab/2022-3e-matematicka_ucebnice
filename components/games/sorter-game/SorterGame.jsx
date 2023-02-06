// inspiration ===> https://codesandbox.io/s/react-beautiful-dnd-zh2wy?file=/index.js

import React, {useEffect, useState} from "react";
import {StrictModeDroppable} from "./StrictModeDroppable";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import gameStyles from '../../../styles/games/Game.module.css'
import sorterGameStyles from '../../../styles/games/SorterGame.module.css'
import trueFalseGameStyles from '../../../styles/games/TrueFalseGame.module.css'
import gameUtilsStyles from "../../../styles/games/GameUtils.module.css";
import GameNav from "../GameNav";
import {generateSorterGameObject} from "../../../lib/equationGeneration";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {Button} from "react-bootstrap";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const SorterGame = ({gameLength, size, difficulty}) => {
    const [stage, setStage] = useState(0);
    const [game, setGame] = useState([]);

    useEffect(() => {
        setGame(prevState => {
            prevState[0] = generateSorterGameObject(size, difficulty)
            return prevState
        })
    }, []);

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination)
            return

        setGame(prevState => {
            prevState[stage] = {
                items: reorder(prevState[stage].items, result.source.index, result.destination.index),
                result: prevState[stage].result,
                elevation: prevState[stage].evaluation
            }

            return [...prevState]
        })
    }

    const handleNextStage = () => {
        if (stage !== gameLength - 1) {
            setStage(prevState => {
                const nextStage = (prevState + 1) % gameLength

                if (typeof game[nextStage] === 'undefined') {
                    setGame(prevState => {
                        prevState[nextStage] = generateSorterGameObject(size, difficulty)
                        return [...prevState]
                    })
                }

                return nextStage
            })
        }
    }

    const handlePreviousStage = () => {
        if (stage !== 0)
            setStage(prevState => prevState - 1)
    }

    const handleAnswerSubmit = () => {
        let equationStr = game[stage].items.join('')
        console.log(equationStr)

        let result = false
        try {
            result = eval(equationStr) === Number.parseInt(game[stage].result)
        } catch (e) {
            // incorrect
        }

        if (result) {
            console.log('correct')
            setGame(prevState => {
                prevState[stage] = {
                    items: prevState[stage].items,
                    result: prevState[stage].result,
                    evaluation: true
                }
                return [...prevState]
            })
            setTimeout(handleNextStage, 1300)
        } else {
            console.log('incorrect')
            setGame(prevState => {
                prevState[stage] = {
                    items: prevState[stage].items,
                    result: prevState[stage].result,
                    evaluation: false
                }
                return [...prevState]
            })
        }
    }

    console.log(game[stage], game[stage] !== undefined)

    const resultCheckable = typeof game[stage] !== 'undefined' && game[stage].evaluation !== undefined
    return (
        <>
            <div className={gameStyles.frame}>
                <GameNav
                    showPreviousButton={stage !== 0}
                    showNextButton={stage !== gameLength - 1}
                    handleNextStage={handleNextStage}
                    handlePreviousStage={handlePreviousStage}
                />
                <div className={gameStyles.mainContentContainer} style={{overflow: "scroll"}}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <StrictModeDroppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`
                                        d-flex w-100 
                                        flex-column 
                                        align-items-center 
                                        justify-content-center 
                                        rounded-2 
                                        pb-1 pt-1`
                                    }
                                >
                                    {game[stage].items.map((item, index) => (
                                        <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`
                                                        hoverDarkShadow 
                                                        m-1 p-2 w-75
                                                        rounded-2 
                                                        d-flex 
                                                        align-items-center 
                                                        justify-content-center
                                                        ${snapshot.isDragging ? `darkShadow ${sorterGameStyles.isDragging}` : sorterGameStyles.notDragging}`
                                                    }
                                                >
                                                    {item}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </StrictModeDroppable>
                    </DragDropContext>
                    <div className={`w-75 d-flex flex-row align-items-center justify-content-end`}>
                        <Button
                            variant={"outline-secondary"}
                            className={`
                                d-flex
                                justify-content-center
                                align-items-center
                                hoverDarkShadow
                                m-1
                                ${resultCheckable ? (game[stage].evaluation ? gameUtilsStyles.correct : gameUtilsStyles.incorrect) : ''}
                                ${resultCheckable ? trueFalseGameStyles.checkedButton : ''}
                                ${trueFalseGameStyles.button}`
                            }
                            onClick={handleAnswerSubmit}
                        >
                            <BsFillCheckCircleFill />
                        </Button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SorterGame