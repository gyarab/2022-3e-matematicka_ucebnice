import {useCallback, useState, useMemo} from "react"
import Button from 'react-bootstrap/Button';
import {Stage,Graphics,Sprite,Container,useTick,color } from "@inlet/react-pixi";
import gameStyles from "../../../styles/games/Game.module.css";
import gameUtilsStyles from '../../../styles/games/GameUtils.module.css'
import GameNav from "../GameNav";
import { generateTriangleQuestion,generateGeometricQuestions } from "../../../lib/geometryGeneration";
import { Color } from 'pixi.js';
class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
/**
 * 
 * @param {String} question main question 
 * @param {number} shape number of dots 3 - triangle 4 - rectangle -1 
 * @param {number} value value of object
 * @param {number} tSettings 1 - right angle triangle, 2 - rovnostrany
 * @returns
 */
const Geometry = ({size, difficulty}) => {
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

const handlePreviousStage = () => {
    
    setStage(prevState => (prevState - 1))

}
/*
setGame(prevState =>{
  prevState = generateTriangleQuestion(1)
  return[...prevState]
})
*/

  const deleteLastDot = () =>{
    setDotList(prevState =>{
      let newList = []

      console.log("questions 1")
      console.log(questions[0])
      console.log("questions 2")
      console.log(questions[1])
      for (let i = 0; i < prevState.length-1; i++){
        newList.push(prevState.at(i))
      }
      return[...newList]
    })
  }

  const drawGrid = useCallback(g => {

    function lines_across(g1 = g) {
      for(let i = 0;i <10;i++){
        g.moveTo(0,i*40)
        g.lineTo(400,i*40)
      }
    }
    function lines_down(g1 = g){
      for(let i = 0;i <10;i++){
        g.moveTo(i*40,0)
        g.lineTo(i*40,400)
      }
    }
    function hitBox(g1 = g) {
      for(let i = 0;i <9;i++){
        for(let j = 0;j <9;j++){
          g.beginFill(bgColor)
          g.lineStyle(0, bgColor, 0)
          g.drawRect(25+i*40,25+j*40,30,30) 
        }
      }
    }
    g.clear()
    
    hitBox(g)
    g.beginFill(gridColor)
    g.lineStyle(4, gridColor, 1)
    lines_across(g)
    lines_down(g)
    
  },[]);
  const drawGeometry = g => {
    g.clear()
    g.beginFill(0x8600b3)
    g.lineStyle(4, 0x3336FF, 1)
    //dots
    
    for (let i = 0; i< dotList.length;i++){
      g.lineStyle(4, dotColor, 1)
      g.beginFill(lineColor)
      g.drawCircle(dotList.at(i).x*40+40,dotList.at(i).y*40+40,8)
    }
    //lines
    for (let i = 0; i< dotList.length-1;i++){
      g.lineStyle(8, lineColor, 1)
      g.beginFill(lineColor)
      g.moveTo(dotList.at(i).x *40+40,dotList.at(i).y *40+40)
      g.lineTo(dotList.at(i+1).x *40+40,dotList.at(i+1).y *40+40)
    }
    //last
    if(dotList.length>2){
    g.moveTo(dotList.at(0).x *40+40,dotList.at(0).y *40+40)
    g.lineTo(dotList.at(dotList.length-1).x *40+40,dotList.at(dotList.length-1).y *40+40)
    }
  };
  


  return (
    <div>
      <Button
        className={'m-2'}
        style={{color: 'white'}}
        variant={"secondary"}
    >
        {`${questions[stage].question}`}
    </Button>
      <div className={`${gameStyles.frame} m-2`}>
                <GameNav
                    showPreviousButton={stage !== 0}
                    handleNextStage={handleNextStage}
                    
                />
                <div className={`w-100 d-flex flex-column align-items-center justify-content-center ${gameStyles.mainContentContainer}`}>
      <Button
      key={69}
      variant={"outline-secondary"}
      
        className={`m-2`}
        onClick={() => deleteLastDot()}
    >
      Odstranit
    </Button>
    
    <Stage id='Stage'
    width={400} 
    height={400} 
    renderOnComponentChange={true}
    raf={false}
    
    options={{ 
    backgroundColor: bgColor, 
    antialias: true, 
    }}>
    
    <Graphics draw={drawGrid}
    interactive={true}
    pointerdown={(e) => {
      var x = Math.floor((e.data.global.x-20) / 40)
      var y = Math.floor((e.data.global.y -20) / 40)
      
      
      setDotList(prevState =>{
        if(prevState.length<dotLimit)prevState.push(new Dot(x,y))
        //unike dots in list
        let unikeList = []
        unikeList.push(prevState.at(0))
        for(let i =1; i<prevState.length; i++){
          let unike = true;  
          for(let j = 0; j<unikeList.length; j++){
              if(unikeList.at(j).x===prevState.at(i).x&&unikeList.at(j).y===prevState.at(i).y){
                unike = false
              }
            }
            if(unike){
              unikeList.push(prevState.at(i))
            }
        }
        console.log(unikeList)
        console.log(unikeList.length)
        return[...unikeList]
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
