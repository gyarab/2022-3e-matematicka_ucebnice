import {useEffect, useState} from "react";
import CardFlipperCard from "./CardFlipperCard";
import GameNav from "../GameNav";
import gameStyles from '../../../styles/games/Game.module.css'
import axios from "axios";
import {reviver} from "../../../lib/utils/utils";


const CardFlipper = ({size, difficulty, email}) => {
    /*
        TODO -> mobile design
        TODO -> zvážit časový timeout po zobrazení nové karty ==> neotočí se omylem
     */

    const [pairs, setPairs] = useState([{
        keyValue: '',
        value: ''
    }]);
    const [stage, setStage] = useState(0);
    const [isValueShown, setIsValueShown] = useState();

    useEffect(() => {
        getNewTrueFalsePairs()
    }, []);

    function getNewTrueFalsePairs() {
        axios.post('/api/games/getEqualPairs', {
            ...email,
            difficulty: 1,
            size: 5,
            gameId: 4
        }).then(response => {
            //console.log(response)
            response.data.pairs = JSON.parse(response.data.pairs, reviver)
            setPairs(generatePairArray(response.data.pairs))
        }).catch(err => {
            console.log(err)
        })
    }

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
                <div
                    className={`w-100 d-flex flex-column align-items-center justify-content-center ${gameStyles.mainContentContainer}`}>
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