import {error} from "next/dist/build/output/log";

/**
 * GENERATE EQUATION
 *
 * function provides equation documentation
 *
 * - length - tells the function what is the number of polynomials in the equation (unlimited)
 * - difficulty - tells the function what should be the output difficulty (number 1 to 3)
 *
 * @param length
 * @param difficulty
 * @returns {{question: string, answers: *[], correctAnswer: number}}
 */
export default function generateEquation(length, difficulty) {
    /*
    TODO -> Funkce by měla vracet objekt jako je níže. Tento obsah by měla vygenerovat! Nezáleží na počtu odpovědí, ale je vždy pouze 1 správná.
    TODO -> Abychom to trochu zobecnili, funkce by měla mít něco jako parametr `length`, který bude udávat počet členů v rovnici a dále úroveň obtížnosti.
    difficulty 1 = cisla od 1 do 10
    difficulty 2 = cisla od 1 do 50
    difficulty 3 = cisla od 1 do 100
    */

    if (typeof length === "undefined" || typeof difficulty === "undefined")
        throw new Error('All parameters must be defined!')
    if (length === null || difficulty === null)
        throw new Error('There are not null parameters acceptable only!')
    if (isNaN(length))
        throw new Error('The equation length is not a number!')
    if (isFinite(length) || isFinite(difficulty))
        throw new Error('It is required to have finite value of the parameter!')
    if (isNaN(difficulty))
        throw new Error('The difficulty is not a number!')

    let equation = "";
    let correctAnswer = 0;
    if (difficulty === 1) {
        difficulty = 10 + 1;
    } else if (difficulty === 2) {
        difficulty = 50 + 1;
    } else if (difficulty === 3) {
        difficulty = 100 + 1;
    } else {
        throw new Error('The equation has incorrect difficulty parameter! Read the documentation...')
    }

    for (let i = 0; i < length; i++) {
        let a = Math.floor(Math.random() * difficulty);

        if (Math.floor(Math.random() * 2) === 1) {
            correctAnswer += a;
            equation += ("+" + " " + a + " ");
        } else {
            correctAnswer -= a;
            equation += ("-" + " " + a + " ");
        }
    }
    equation += "= x";
    let ans = []
    ans.push(correctAnswer);
    ans.push(correctAnswer - 2);
    ans.push(correctAnswer + 2);
    ans.push(correctAnswer + 1);
    ans = ans.sort((a, b) => 0.5 - Math.random());

    return {
        question: equation,
        correctAnswer: correctAnswer,
        answers: ans
    }
}
