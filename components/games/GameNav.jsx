import gameNavStyles from "../../styles/games/GameNav.module.css";
import {Button} from "react-bootstrap";

const GameNav = ({showPreviousButton, showNextButton, handlePreviousStage, handleNextStage}) => {
    const showBothButtons = showPreviousButton && showNextButton

    return (
        <div
            className={`
                d-flex 
                flex-row
                align-items-center
                w-100
                ${showPreviousButton ? 'justify-content-between' : 'justify-content-end'}
                ${gameNavStyles.buttonGroup}`
            }
        >
            {
                showPreviousButton &&
                <Button
                    variant={"info"}
                    type={'button'}
                    className={`${gameNavStyles.button} d-flex justify-content-center m-2`}
                    onClick={handlePreviousStage}
                >
                    Předchozí
                </Button>
            }
            {
                showNextButton &&
                <Button
                    variant={"info"}
                    type={'button'}
                    className={`${gameNavStyles.button} m-2`}
                    onClick={handleNextStage}
                >
                    Další
                </Button>
            }
        </div>
    )
}

export default GameNav