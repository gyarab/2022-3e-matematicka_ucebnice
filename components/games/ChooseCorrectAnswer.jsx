/**
 * CHOOSE CORRECT ANSWER GAME
 *
 * This game renders some question based on props, and renders a bunch of buttons with possible answers and one correct
 * answer, which is one of them. User answers by clicking on the button.
 *
 * - question: is question that is asked (string)
 * - answers: possible answers (array of strings)
 * - correctAnswer: correct answer that should be one of the answers from answers array (string)
 * - helperText: text which clarifies the question (string)
 * - equation: text representing some equation, that should be used with math questions (text)
 *
 * @param question
 * @param answers
 * @param correctAnswer
 * @param helperText
 * @param equation
 * @returns {JSX.Element}
 * @constructor
 */
const ChooseCorrectAnswer = ({question, answers, correctAnswer, helperText, equation}) => {
    /*
    TODO -> component design
    TODO -> equation (how to format equation in html-react)
    TODO -> correct answer handler
    TODO -> score saving
     */

    return (
        <div>
            <div>{question}</div>
            {
                helperText !== null &&
                <div>{helperText}</div>
            }
            {
                equation !== null &&
                <div>{question}</div>
            }
            <ul>
                {answers.map(answer => {
                    return <li key={answer}>{answer}</li>
                })}
            </ul>
        </div>
    )
}

export default ChooseCorrectAnswer