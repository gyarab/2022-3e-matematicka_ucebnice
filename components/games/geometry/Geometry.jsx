import {useState} from "react"
import Button from 'react-bootstrap/Button';
import {Graphics, Stage} from "@inlet/react-pixi";
import {generateGeometricQuestions} from "../../../lib/generation/geometryGeneration.js";
import GameNav from "../GameNav";
import gameStyles from "../../../styles/games/Game.module.css"

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.z = 0;
    }
}

// 0xDE780B
const bgColor = '0xF6B200'
const gridColor = '0xFFFFFF'
const dotColor = '0xDE780B'
const lineColor = '0x000000'

const calcMove = (deflection, coefficient, layer) => {
    return (deflection + coefficient * layer)
}

const isDotInArr = (part, list) => {
    for (const item of list)
        if (item.x === part.x && item.y === part.y)
            return true

    return false
}

/**
 *
 * @param {String} question main question
 * @param {number} shape number of dots 3 - triangle 4 - rectangle -1
 * @param {number} value value of object
 * @param {number} tSettings 1 - triangle with right angle, 2 - triangle with the same size sides??
 * @returns
 */
/*
text - question
dependences:
  shape
  value - optional
  triange setting - optional
  one angle - optional
  -
*/
const Geometry = (size = 1, difficulty = 1) => {
    //TODO functions, checking rightness, remove upper part of canvas, make better dotAdd using rewritting
    //parameters
    /*
      text - question
      dependences:
        shape
        value - optional
        triange setting - optional
        one angle - optional
    */

    const [game, setGame] = useState(generateGeometricQuestions(size, difficulty))
    const [dotList, setDotList] = useState([])
    const [stage, setStage] = useState(0);


    function generateGameSetting() {

    }

    const resetDotList = () => setDotList([])


    const handleNextStage = () => {
        resetDotList()
        setStage(prevState => (prevState + 1))
    }

    const handlePreviousStage = () => {
        resetDotList()
        setStage(prevState => (prevState - 1))
    }

    const deleteLastDot = () => {
        setDotList((prevState) => prevState.slice(0, -1))
    }
    const checkGeometry = () => {
        console.log(game[stage])
        console.log()
        const correct = true
        if (game[stage].tSettings !== -1){
            //kontrola trojuhelnika planimetrie
            let u = new Dot((dotList[0].x - dotList[1].x) , (dotList[0].y - dotList[1].y))
            let v = new Dot((dotList[1].x - dotList[2].x) , (dotList[1].y - dotList[2].y))
            let w = new Dot((dotList[0].x - dotList[2].x) , (dotList[0].y - dotList[2].y))
            console.log(u)
            console.log(v)
            console.log(w)
                console.log(u.x +" "+ v.x +" "+" "+u.y +" "+ v.y +"= "+(u.x * v.x +u.y * v.y ))
                console.log((u.x +" "+ w.x +" "+u.y +" "+ w.y ) +" "+(u.x * w.x +u.y * w.y ))
                console.log((v.x * w.x +v.y * w.y ))

            if(game[stage].tSettings === 1){ //pravouhly
                
                console.log(u.x +" "+ v.x +" "+" "+u.y +" "+ v.y +"= "+(u.x * v.x +u.y * v.y ))
                console.log((u.x +" "+ w.x +" "+u.y +" "+ w.y ) +" "+(u.x * w.x +u.y * w.y ))
                console.log((v.x * w.x +v.y * w.y ))
                if ((u.x * v.x +u.y * v.y )=== 0 || (u.x * w.x +u.y * w.y )=== 0 || (v.x * w.x +v.y * w.y )=== 0){
                    
                }else{
                    console.log("setting 1 false")
                    return false
                }
                
            }
            else if(game[stage].tSettings === 2){ //rovnorameny
                if(v.x*v.x +v.y*v.y === u.x*u.x +u.y*u.y ||v.x*v.x +v.y*v.y === w.x*w.x +w.y*w.y || u.x*u.x +u.y*u.y === w.x*w.x +w.y*w.y){
                    
                }else{
                    console.log("setting 2 false")
                    return false
                }

            }
            return true
        }
        if(game[stage].value !== -1){
            //kontrola obsahu
            if(game[stage].shape === 3 ||game[stage].shape === 4){
                //a × b = (a2b3-a3b2; a3b1-a1b3; a1b2-a2b1)
                if(u.x*v.y-u.y*v.x === value){
                    
                }else{
                    return false
                }
                //trojuhelnik
            }
            
        }
        return true

    }
    const stageChange = () =>{
        console.log(game[stage])
        console.log(checkGeometry())
        if(checkGeometry()){
            //TODO error with max stage
            setStage(prevState => (prevState + 1))
        }
    }

    const drawGrid = (g) => {
        g.clear()

        const hitBox = {
            width: 40,
            height: 40
        }

        // draws hit boxes
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                g.beginFill(bgColor).lineStyle(bgColor).drawRect(calcMove(25, i, 40), calcMove(25, j, 40), hitBox.width, hitBox.height)

        g.beginFill(gridColor).lineStyle(4, gridColor, 1)

        // draws grid lines
        for (let i = 1; i < 10; i++)
            g.moveTo(0, i * 40).lineTo(400, i * 40).moveTo(i * 40, 0).lineTo(i * 40, 400)
    }

    const drawGeometry = (g) => {
        g.clear()

        // render loop
        for (let i = 0; i < dotList.length; i++) {
            const dot = dotList.at(i)

            // dots
            g.lineStyle(4, dotColor, 1).beginFill(lineColor)
            g.drawCircle(calcMove(40, dot.x, 40), calcMove(40, dot.y, 40), 8)

            // lines
            if (i < dotList.length - 1) {
                const nextDot = dotList.at(i + 1)
                g.lineStyle(5, lineColor, 1).beginFill(lineColor)
                g.moveTo(calcMove(40, dot.x, 40), calcMove(40, dot.y, 40))
                g.lineTo(calcMove(40, nextDot.x, 40), calcMove(40, nextDot.y, 40))
            }
        }

        //last
        if (dotList.length > 2) {
            const firstDot = dotList.at(0)
            const lastDot = dotList.at(dotList.length - 1)
            g.lineStyle(5, lineColor, 1).beginFill(lineColor)
            g.moveTo(calcMove(40, firstDot.x, 40), calcMove(40, firstDot.y, 40))
            g.lineTo(calcMove(40, lastDot.x, 40), calcMove(40, lastDot.y, 40))
        }
    };


    return (
        <div className={`${gameStyles.frame} m-2`}>
            <GameNav
                showPreviousButton={stage !== 0}
                showNextButton={stage !== game.length - 1}
                handlePreviousStage={handlePreviousStage}
                handleNextStage={handleNextStage}
            />
            <div
                className={`w-100 d-flex flex-column align-items-center justify-content-center ${gameStyles.mainContentContainer}`}>
                <Button
                    className={'m-2'}
                    variant={"secondary"}
                >
                    {`${game[stage].question}`}
                </Button>
                <Button
                    variant={"outline-secondary"}
                    className={`m-2`}
                    onClick={() => deleteLastDot()}
                >
                    Odstranit
                </Button>
                <Button
                    variant={"outline-secondary"}
                    className={`m-2`}
                    onClick={() => stageChange()}
                >
                    Zkontrolovat
                </Button>

                <Stage
                    width={400}
                    height={400}
                    raf={false}
                    renderOnComponentChange={true}
                    className={`rounded-2 m-2 darkShadow`} // TODO -> update rounded design
                    options={{
                        backgroundColor: bgColor,
                        antialias: true,
                    }}
                >
                    <Graphics
                        draw={drawGrid}
                        interactive={true}
                        pointerdown={(e) => {
                            const x = Math.floor((e.data.global.x - 20) / 40)
                            const y = Math.floor((e.data.global.y - 20) / 40)
                            const newDot = new Dot(x, y)

                            if (isDotInArr(newDot, dotList))
                                return
                            if (dotList.length >= game[stage].shape){
                                return
                            }
                            setDotList(prevState => [...prevState, newDot])
                        }}
                    />
                    <Graphics name={"Geometry"} draw={drawGeometry}/>
                </Stage>
            </div>
        </div>
    );
}

export default Geometry;