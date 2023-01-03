import {Button, Card} from "react-bootstrap";
import Router from 'next/router'

/**
 * HOMEPAGE CARD
 *
 * - component renders a card for redirection into specific class
 * - used in /homepage route
 *
 * @param description
 * @param redirectDestination
 * @returns {JSX.Element}
 * @constructor
 */
const HomepageCard = ({title, description, redirectDestination}) => {
    return (
        <Card
            bg={'primary'}
            text={'white'}
            style={{width: '18rem'}}
            className={"m-4 mb-2 darkShadow"}
        >
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant={'secondary'}
                        onClick={() => Router.push(redirectDestination)}
                >
                    Vstoupit do třídy
                </Button>
            </Card.Body>
        </Card>
    )
}

export default HomepageCard