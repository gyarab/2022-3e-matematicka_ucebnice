import {getRandomInt} from "./equationGeneration";

//TODO all xd
export function generateTriangleQuestion(difficulty) {
    if (difficulty === 1) {
        let shapeList = [
            "pravouhlý",  // option 1
            "rovnoramenný"// option 2
        ]
        let index = getRandomInt(1, 2)

        console.log({
            question: "Narysuj " + shapeList.at(index - 1) + " trojúhelnik",
            shape: 3,
            value: -1,
            tSettings: index,
        })
        return {
            question: "Narysuj " + shapeList.at(index - 1) + " trojúhelnik",
            shape: 3,
            value: -1,
            tSettings: index,
        }
    }
}

export function generateSquareQuestion(difficulty) {
    if (difficulty === 1) {
        let value = getRandomInt(7) * 2
        return {
            question: "Narysuj obdelnik, který má obsah " + value,
            shape: 4,
            value: value,
            tSettings: -1,
        }
    }

}

export function generateTrapezoidQuestion(difficulty) {

}

export function generateGeometricQuestions(size, difficulty) {
    let questions = []
    for (let i = 0; i < size; i++) {
        let choice = getRandomInt()
        switch (choice) {
            case 0:
                questions.push(generateSquareQuestion(difficulty))
                break;
            case 1:
                questions.push(generateTriangleQuestion(difficulty))
                break;
        }
    }
    return questions
}

