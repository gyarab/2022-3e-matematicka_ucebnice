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

const calcMove = (deflection, coefficient, layer) => {
    return (deflection + coefficient * layer)
}

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


<<<<<<< HEAD

  const questions = useMemo(() =>(generateGeometricQuestions(size,difficulty),[size, difficulty]));
  const [dotList, setDotList]  = useState([])
  const [stage, setStage] = useState(0);
  let bgColor = new Color(0x3C486B)
  let gridColor = new Color(0xF0F0F0)
  let dotColor = new Color(0xF9D949)
  let lineColor = new Color(0xF45050)

  let dotLimit = 100

  const handleNextStage = () => {
    setStage(prevState => (prevState + 1))
}
=======
    */

    //const [game, setGame] = useState(0)
    const game = generateTriangleQuestion(1)
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

    const drawGrid = (g) => {
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
            const hitBox = {
                width: 40,
                height: 40
            }

            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    g.beginFill(bgColor)
                    g.lineStyle(bgColor)
                    g.drawRect(
                        calcMove(25, i, 40),
                        calcMove(25, j, 40),
                        hitBox.width,
                        hitBox.height
                    )
                }
            }
        }

        g.clear()

        hitBox()
        g.beginFill(gridColor)
        g.lineStyle(4, gridColor, 1)
        lines_across()
        lines_down()
    }

    const drawGeometry = (g) => {
        g.clear()

        // render loop
        for (let i = 0; i < dotList.length; i++) {
            const dot = dotList.at(i)

            // dots
            g.lineStyle(4, dotColor, 1)
            g.beginFill(lineColor)
            g.drawCircle(
                calcMove(40, dot.x, 40),
                calcMove(40, dot.y, 40),
                8
            )

            // lines
            if (i < dotList.length - 1) {
                const nextDot = dotList.at(i + 1)
                g.lineStyle(8, lineColor, 1)
                g.beginFill(lineColor)
                g.moveTo(
                    calcMove(40, dot.x, 40),
                    calcMove(40, dot.y, 40),
                )
                g.lineTo(
                    calcMove(40, nextDot.x, 40),
                    calcMove(40, nextDot.y, 40),
                )
            }
        }

        //last
        if (dotList.length > 2) {
            const firstDot = dotList.at(0)
            const lastDot = dotList.at(dotList.length - 1)
            g.lineStyle(8, lineColor, 1)
            g.beginFill(lineColor)
            g.moveTo(
                calcMove(40, firstDot.x, 40),
                calcMove(40, firstDot.y, 40),
            )
            g.lineTo(
                calcMove(40, lastDot.x, 40),
                calcMove(40, lastDot.y, 40),
            )
        }
    };


    return (
        <div>
            <Button
                className={'m-2'}
                style={{color: 'white'}}
                variant={"secondary"}
            >
                {`${game.question}`}
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
