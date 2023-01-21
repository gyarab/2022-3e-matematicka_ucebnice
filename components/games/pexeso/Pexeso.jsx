import {useState} from "react";
import {generatePexeso} from "../../../lib/equationGeneration";
import {Row} from "react-bootstrap";
import PexesoCard from "./PexesoCard";
import gameStyles from "../../../styles/games/Game.module.css";

const Pexeso = ({size, difficulty}) => {
    const [pexeso, setPexeso] = useState(generatePexeso(size, difficulty));
    const [genpex, setGenpex] = useState(generateGenpexArray());
    const [flippedCards, setFlippedCards] = useState({
        card1: '',
        card2: ''
    })

    function generateGenpexArray() {
        let inArr = []
        for (const [value, key] of pexeso) {
            inArr.push(value)
            inArr.push(key)
        }

        const chunkSize = size;

        inArr = inArr.reduce((acc, item, idx) => {
            let group = acc.pop();
            if (group.length === chunkSize) {
                acc.push(group);
                group = [];
            }
            group.push(item);
            acc.push(group);
            return acc;
        }, [[]])
        return inArr
    }

    return (
        <>
            <div className={`p-2 mb-3 ${gameStyles.gameContainer}`}>
                {
                    genpex.map((row, index) => {
                        return (
                            <Row key={index} className={'align-items-center justify-content-center'}>
                                {
                                    row.map((card, idx) => {
                                        return (
                                            <PexesoCard
                                                key={idx}
                                                value={card}
                                            />
                                        )
                                    })
                                }
                            </Row>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Pexeso
