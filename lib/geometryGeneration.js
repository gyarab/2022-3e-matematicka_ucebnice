import { getRandomInt } from "./equationGeneration";
//TODO all xd
export function generateTriangleQuestion(difficulty) {
    if (difficulty == 1){
        let shapeList = [
            "pravouhlý",  //setting 1
            "rovnoramenný"//setting 2
        ]
        let index = getRandomInt()
        return {
            question:"Narysuj "+shapeList.at(index)+" trojúhelnik",
            shape: 3,
            value:-1,
            tSettings: index,
        }
    }
}
export function generateSquareQuestion(difficulty) {

}
export function generateTrapezoidQuestion(difficulty) {

}

