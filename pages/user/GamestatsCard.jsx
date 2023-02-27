import {Button, Card} from "react-bootstrap";
import Router from 'next/router'
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
            style={{width: '24rem'}}
            className={"m-4 mb-2 darkShadow"}
        >
            <Card.Body>
                <Card.Title>{gameTitle}</Card.Title>                
                <Card.Body>
                    <GenerateGameStatsTable
                    />
                </Card.Body>
                    

                    


            </Card.Body>
        </Card>
    )
}

export default GameStatsCard