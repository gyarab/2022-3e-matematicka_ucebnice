import {useMemo, useState} from "react";
import {generateEqualPairs} from "../../../lib/equationGeneration";
import CardFlipperCard from "./CardFlipperCard";
import GameNav from "../GameNav";
import gameStyles from '../../../styles/games/Game.module.css'


const CardFlipper = ({size, difficulty}) => {
    /*
        TODO -> mobile design
        TODO -> zvážit časový timeout po zobrazení nové karty ==> neotočí se omylem
     */

    const pairs = useMemo(() => generatePairArray(generateEqualPairs(size, difficulty)), [size, difficulty])
    const [stage, setStage] = useState(0);
    const [isValueShown, setIsValueShown] = useState();

    function generatePairArray(pairMap) {
        let pairArr = []
        for (const [key, value] of pairMap) {
            pairArr.push({
                keyValue: key,
                value: value
            })
        }

        return pairArr
    }

    const handleNextStage = () => {
        if (!isValueShown)
            setIsValueShown(true)

        setStage(prevState => (prevState + 1) % pairs.length)
    }

    const handlePreviousStage = () => {
        if (!isValueShown)
            setIsValueShown(true)

        setStage(prevState => prevState - 1)
    }

    const flipCard = () => {
        setIsValueShown(!isValueShown)
    }

    return (
        <>
            <div className={`${gameStyles.frame} m-2`}>
                <GameNav
                    showPreviousButton={stage !== 0}
                    showNextButton={stage !== pairs.length - 1}
                    handleNextStage={handleNextStage}
                    handlePreviousStage={handlePreviousStage}
                />
                <div className={`w-100 d-flex flex-column align-items-center justify-content-center ${gameStyles.mainContentContainer}`}>
                    <CardFlipperCard
                        keyValue={pairs[stage].keyValue}
                        value={pairs[stage].value}
                        isValueShown={isValueShown}
                        flipCard={flipCard}
                    />
                </div>

            </div>
        </>
    )
}

export default CardFlipper