import {useCallback, useState} from "react"
import Button from 'react-bootstrap/Button';
import {Graphics, Stage} from "@inlet/react-pixi";
import {Color} from 'pixi.js';
import {generateTriangleQuestion} from "../../../lib/geometryGeneration";
import GameNav from "../GameNav";
import gameStyles from "../../../styles/games/Game.module.css"

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const bgColor = new Color(0x3C486B)
const gridColor = new Color(0xF0F0F0)
const dotColor = new Color(0xF9D949)
const lineColor = new Color(0xF45050)

const dotLimit = 100

/**
 *
 * @param {String} question main question
 * @param {number} shape number of dots 3 - triangle 4 - rectangle -1
 * @param {number} value value of object
 * @param {number} tSettings 1 - triangle with right angle, 2 - triangle with the same size sides??
 * @returns
 */
//const Geometry = ({question = "empty", shape = -1, value = -1, tSettings = -1}) => {
//TODO functions, checking rightness, remove upper part of canvas, make better dotAdd using rewritting
//parameters
/*
text - question
dependences:
  shape
  value - optional
  triange setting - optional
  one angle - optional
  -
*/
const Geometry = (difficulty = 1) => {
    //TODO functions, checking rightness, remove upper part of canvas, make better dotAdd using rewritting
    //parameters
    /*
      text - question
      dependences:
        shape
        value - optional
        triange setting - optional
        one angle - optional
        -


    */

    const [game, setGame] = useState([generateTriangleQuestion(difficulty)])
    const [dotList, setDotList] = useState([])
    const [stage, setStage] = useState(0);

    function generateGameSetting() {

    }

    const handleNextStage = () => {
        setStage(prevState => (prevState + 1))
    }

    const handlePreviousStage = () => {
        setStage(prevState => (prevState - 1))
    }
    /*
    setGame(prevState =>{
      prevState = generateTriangleQuestion(1)
      return[...prevState]
    })
    */

    const deleteLastDot = () => {
        setDotList(prevState => [...prevState.splice(0, prevState.length - 1)])
    }

    const drawGrid = useCallback(g => {
        function lines_across() {
            for (let i = 0; i < 10; i++) {
                g.moveTo(0, i * 40)
                g.lineTo(400, i * 40)
            }
        }

        function lines_down() {
            for (let i = 0; i < 10; i++) {
                g.moveTo(i * 40, 0)
                g.lineTo(i * 40, 400)
            }
        }

        function hitBox() {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    g.beginFill(bgColor)
                    g.lineStyle(0, bgColor, 0)
                    g.drawRect(25 + i * 40, 25 + j * 40, 30, 30)
                }
            }
        }

        g.clear()

        hitBox()
        g.beginFill(gridColor)
        g.lineStyle(4, gridColor, 1)
        lines_across()
        lines_down()

    }, []);

    const drawGeometry = (g) => {
        g.clear()
        g.beginFill(0x8600b3)
        g.lineStyle(4, 0x3336FF, 1)
        //dots

        for (let i = 0; i < dotList.length; i++) {
            g.lineStyle(4, dotColor, 1)
            g.beginFill(lineColor)
            g.drawCircle(dotList.at(i).x * 40 + 40, dotList.at(i).y * 40 + 40, 8)
        }
        //lines
        for (let i = 0; i < dotList.length - 1; i++) {
            g.lineStyle(8, lineColor, 1)
            g.beginFill(lineColor)
            g.moveTo(dotList.at(i).x * 40 + 40, dotList.at(i).y * 40 + 40)
            g.lineTo(dotList.at(i + 1).x * 40 + 40, dotList.at(i + 1).y * 40 + 40)
        }
        //last
        if (dotList.length > 2) {
            g.moveTo(dotList.at(0).x * 40 + 40, dotList.at(0).y * 40 + 40)
            g.lineTo(dotList.at(dotList.length - 1).x * 40 + 40, dotList.at(dotList.length - 1).y * 40 + 40)
        }
    };


    return (
        <div>
            <Button
                className={'m-2'}
                style={{color: 'white'}}
                variant={"secondary"}
            >
                {`${game[stage].question}`}
            </Button>
            <div className={`${gameStyles.frame} m-2`}>
                <GameNav
                    showPreviousButton={stage !== 0}
                    handleNextStage={handleNextStage}
                />
                <div
                    className={`w-100 d-flex flex-column align-items-center justify-content-center ${gameStyles.mainContentContainer}`}>
                    <Button
                        variant={"outline-secondary"}
                        className={`m-2`}
                        onClick={() => deleteLastDot()}
                    >
                        Odstranit
                    </Button>

                    <Stage
                        id='Stage'
                        width={400}
                        height={400}
                        renderOnComponentChange={true}
                        raf={false}
                        options={{
                            backgroundColor: bgColor.value,
                            antialias: true,
                        }}
                    >
                        <Graphics
                            draw={drawGrid}
                            interactive={true}
                            pointerdown={(e) => {
                                const x = Math.floor((e.data.global.x - 20) / 40)
                                const y = Math.floor((e.data.global.y - 20) / 40)

                                setDotList(prevState => {
                                    if (prevState.length < dotLimit)
                                        prevState.push(new Dot(x, y))
                                    //unique dots in list
                                    let uniqueList = []
                                    uniqueList.push(prevState.at(0))
                                    for (let i = 1; i < prevState.length; i++) {
                                        let unique = true;
                                        for (let j = 0; j < uniqueList.length; j++) {
                                            if (uniqueList.at(j).x === prevState.at(i).x && uniqueList.at(j).y === prevState.at(i).y) {
                                                unique = false
                                            }
                                        }
                                        if (unique) {
                                            uniqueList.push(prevState.at(i))
                                        }
                                    }
                                    console.log(uniqueList)
                                    console.log(uniqueList.length)
                                    return [...uniqueList]
                                })
                            }}
                        />
                        <Graphics name={"Geometry"} draw={drawGeometry}/>
                    </Stage>
                </div>
            </div>
        </div>
    );
}

export default Geometry;
