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
import {Button, OverlayTrigger, Popover, Tooltip} from "react-bootstrap";

const ChooseCorrectAnswer = ({question, answers, correctAnswer, helperText, equation}) => {
    /*
    TODO -> component design
    TODO -> equation (how to format equation in html-react)
    TODO -> correct answer handler
    TODO -> score saving
     */

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Nápověda</Popover.Header>
            <Popover.Body>
                {helperText}
            </Popover.Body>
        </Popover>
    )

    return (
        <div>
            <OverlayTrigger trigger={['hover', 'focus']} placement={"right"} overlay={popover}>
                <Button variant={"info"}>{question}</Button>
            </OverlayTrigger>
            <div>
                {answers.map(answer => {
                    return <Button variant={"outline-secondary m-2"} key={answer}>{answer}</Button>
                })}
            </div>
        </div>
    )
}

export default ChooseCorrectAnswer