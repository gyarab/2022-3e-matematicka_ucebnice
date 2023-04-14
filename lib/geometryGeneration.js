import { getRandomInt } from "./equationGeneration";
//TODO all xd
export function generateTriangleQuestion(difficulty) {
    if (difficulty === 1){
        let shapeList = [
            "pravouhlý",  // option 1
            "rovnoramenný"// option 2
        ]
        let index = getRandomInt(1, 2)

        console.log({
            question:"Narysuj "+shapeList.at(index-1)+" trojúhelnik",
            shape: 3,
            value:-1,
            tSettings: index,
        })
        return {
            question:"Narysuj "+shapeList.at(index-1)+" trojúhelnik",
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

