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
        <Card
            bg={'primary'}
            text={'white'}
            style={{width: '26rem'}}
            className={"m-4 mb-2 darkShadow"}
        >
            <Card.Body>
                <Card.Title style={{textAlign: 'center'}}>{gameTitle}</Card.Title>
                <Card.Body>
                    <GenerateGameStatsTable
                        statsMap={statsMap}
                    />
                </Card.Body>

            </Card.Body>
        </Card>
    )
}

export default GameStatsCard