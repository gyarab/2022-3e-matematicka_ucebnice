// inspiration ===> https://codesandbox.io/s/react-beautiful-dnd-zh2wy?file=/index.js

import React, {useEffect, useState} from "react";
import {StrictModeDroppable} from "./StrictModeDroppable";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import gameStyles from '../../../styles/games/Game.module.css'
import sorterGameStyles from '../../../styles/games/SorterGame.module.css'
import trueFalseGameStyles from '../../../styles/games/TrueFalseGame.module.css'
import gameUtilsStyles from "../../../styles/games/GameUtils.module.css";
import GameNav from "../GameNav";
import {generateSorterGameObject, shuffleArray} from "../../../lib/generation/equationGeneration.js";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import axios from "axios";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const title = 'Tip'
const text = 'Seřaťe kartičky tak, aby vždy provedení operace odpovídalo jednomu z výsledků (oranžová barva). Jednotlivé bloky na sebe navazují. To znamená, že kdyby byly čísla +1, +2, pak je jejich výsledek 3 a další trojici vypočítáme jako +3, +4, -5 s výsledkem +2.5'

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">{title}</Popover.Header>
        <Popover.Body>
            {text}
        </Popover.Body>
    </Popover>
)

const SorterGame = ({gameLength, size, difficulty, email}) => {
    const [stage, setStage] = useState(0);
    const [game, setGame] = useState([]);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)

        getNewSorterGame(true)
    }, []);

    function getNewSorterGame(isInitial=false) {
        axios.post('/api/games/getSorterGame', {
            ...email,
            difficulty: difficulty,
            size: size
        }).then(res => {
            //console.log(res)
            const newObject = {
                items: shuffleArray(res.data.items),
                evaluation: undefined
            }
            setGame(prevState => isInitial ? [newObject] : [...prevState, newObject])
        }).catch(err => console.log(err))
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination)
            return

        setGame(prevState => {
            prevState[stage] = {
                items: reorder(prevState[stage].items, result.source.index, result.destination.index),
                evaluation: prevState[stage].evaluation
            }

            return [...prevState]
        })
    }

    const handleNextStage = () => {
        setStage(prevState => {
            const nextStage = (prevState + 1) % gameLength
            typeof game[nextStage] === 'undefined' && getNewSorterGame()
            return nextStage
        })
    }

    const handlePreviousStage = () => {
        setStage(prevState => prevState - 1)
    }

    const handleAnswerSubmit = () => {

        const setEvaluation = (result) => {
            setGame(prevState => {
                prevState[stage] = {
                    items: prevState[stage].items,
                    evaluation: result
                }
                return [...prevState]
            })
        }

        let result = true
        let lastResult = '0'
        const items = game[stage].items
        for (let i = 0; i < items.length; i += 3) {
            const first = items[i].replace('÷', '/')
            const second = items[i + 1].replace('÷', '/')
            const correctAnswer = items[i + 2].substring(1, items[i + 2].length);
            if (first.startsWith('=') || second.startsWith('=') || !items[i + 2].startsWith('=')) {
                result = false
                break;
            }

            const evall = eval('(' + lastResult + ' ' + first + ') ' + second)
            lastResult = correctAnswer
            if (evall.toString() !== correctAnswer) {
                result = false
                break;
            }
        }

        if (result) {
            console.log('correct')
            setEvaluation(true)

            if (stage !== gameLength - 1)
                setTimeout(handleNextStage, 1000)
        } else {
            console.log('incorrect')
            setEvaluation(false)
        }
    }

    const resultCheckable = typeof game[stage] !== 'undefined' && game[stage].evaluation !== undefined
    return (
        <>
            <div className={gameStyles.frame} style={{minHeight: '502px'}}>
                <GameNav
                    showPreviousButton={stage !== 0}
                    showNextButton={stage !== gameLength - 1}
                    handleNextStage={handleNextStage}
                    handlePreviousStage={handlePreviousStage}
                />
                <OverlayTrigger
                    trigger={(windowWidth > 500) ? ['hover', 'focus'] : ['click']}
                    placement={'bottom'}
                    overlay={popover}
                    defaultShow={false}
                >
                    <Button
                        className={'mt-2'}
                        variant={"secondary"}
                    >
                        {'Jak si zahrát tuto hru?'}
                    </Button>
                </OverlayTrigger>
                <div
                    className={`
                        w-100
                        d-flex
                        flex-column
                        align-items-center
                        justify-content-center
                        ${gameStyles.mainContentContainer}`
                    }
                >
                    <div
                        className={`
                            w-100
                            d-flex
                            flex-row
                            align-items-center
                            justify-content-center
                            ${gameStyles.mainContentContainer}`
                        }
                    >
                        <DragDropContext onDragEnd={onDragEnd}>
                            <StrictModeDroppable droppableId={"droppable"}>
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
                                        {typeof game[stage] !== "undefined" && game[stage].items.map((item, index) => {
                                            const isResult = item.startsWith('=')
                                            return (
                                                <Draggable key={index.toString()} draggableId={index.toString()}
                                                           index={index}>
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
                                                                ${snapshot.isDragging ? `darkShadow ${sorterGameStyles.isDragging}` : sorterGameStyles.notDragging}
                                                                ${isResult ? sorterGameStyles.result : ''}
                                                                ${sorterGameStyles.maxWidth}`
                                                            }
                                                        >
                                                            {isResult ? item.substring(1, item.length) : item}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </StrictModeDroppable>
                        </DragDropContext>
                    </div>
                    <div
                        className={`w-75 d-flex flex-row align-items-center justify-content-end ${sorterGameStyles.maxWidth}`}>
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
                            <BsFillCheckCircleFill/>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SorterGame