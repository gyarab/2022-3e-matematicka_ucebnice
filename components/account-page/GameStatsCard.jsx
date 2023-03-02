import {Card} from "react-bootstrap";
import GenerateGameStatsTable from "./GenerateGameStatsTable";

/**
 * GAME STATS CARD
 *
 * - component renders a card for redirection into specific class
 * - used in /homepage route
 *
 * @param statsMap
 * @param redirectDestination
 * @returns {JSX.Element}
 * @constructor
 */
const GameStatsCard = ({gameTitle, statsMap}) => {
    return (
        <li>
            <Card
                bg={'secondary'}
                text={'white'}
                style={{width: '26rem'}}
                className={"m-4 mb-2"}
            >
                <Card.Title className={`w-100 d-flex align-items-center justify-content-center p-2`} >{gameTitle}</Card.Title>
                <Card.Body>
                    <GenerateGameStatsTable
                        statsMap={statsMap}
                    />
                </Card.Body>
            </Card>
        </li>

    )
}

export default GameStatsCard