import gameStyles from "../../styles/games/Game.module.css";
import {Button} from "react-bootstrap";

const GameNav = ({handlePreviousStage, handleNextStage}) => {
    return (
        <div className={gameStyles.buttonGroup}>
            <Button
                variant={"info"}
                type={'button'}
                className={`${gameStyles.button} m-2`}
                onClick={handlePreviousStage}
            >
                Předchozí
            </Button>
            <Button
                variant={"info"}
                type={'button'}
                className={`${gameStyles.button} m-2`}
                onClick={handleNextStage}
            >
                Další
            </Button>
        </div>
    )
}

export default GameNav