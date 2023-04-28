import dynamic from "next/dynamic";
import LoadingSpinner from "../utils/LoadingSpinner";
import {Col, Nav, Row} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';

const ChooseCorrectAnswer = dynamic(() => import('../games/choose-correct-answer/ChooseCorrectAnswer'), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const Pexeso = dynamic(() => import('../games/pexeso/Pexeso'), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const CardFlipper = dynamic(() => import('../games/card-flipper/CardFlipper'), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const TrueFalseGame = dynamic(() => import("../games/true-false-game/TrueFalseGame"), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const SorterGame = dynamic(() => import("../games/sorter-game/SorterGame"), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const Geometry = dynamic(() => import("../games/geometry/Geometry"), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})

const MyClass = ({games, email}) => {

    const renderGame = (game) => {
        switch (game.id) {
            case 0:
                return <div>Nothing</div>
            case 1:
                return (
                    <ChooseCorrectAnswer
                        gameLength={game.gameLength}
                        size={game.size}
                        difficulty={game.difficulty}
                        email={email}
                    />
                )
            case 2:
                return (
                    <Pexeso
                        size={game.size}
                        difficulty={game.difficulty}
                        email={email}
                    />
                )
            case 3:
                return (
                    <CardFlipper
                        size={game.size}
                        difficulty={game.difficulty}
                        email={email}
                    />
                )
            case 4:
                return (
                    <TrueFalseGame
                        size={game.size}
                        difficulty={game.difficulty}
                        email={email}
                    />
                )
            case 5:
                return (
                    <SorterGame
                        gameLength={game.gameLength}
                        size={game.size}
                        difficulty={game.difficulty}
                        email={email}
                    />
                )
            case 6:
                return (
                    <Geometry
                        size={game.size}
                        difficulty={game.difficulty}
                        email={email}
                    />
                )
            default:
                return <div>Fail to load + {id}</div>
        }
    }

    console.log(games)

    return (
        <Tab.Container
            id={"left-tabs"}
        >
            <Row className={`mt-4`}>
                <Col md={'auto'}>
                    <Nav variant={"pills"} className={"flex-column p-2"}>
                        {games.map((game, index) => {
                            return (
                                <Nav.Item key={index} className={`m-2`}>
                                    <Nav.Link eventKey={game.title}
                                              className={`darkShadow text-center`}>{game.title}</Nav.Link>
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col className={`d-flex align-items-start`}>
                    <Tab.Content className={`w-100 d-flex align-items-start justify-content-center p-2`}>
                        {games.map((game, index) => {
                            return (
                                <Tab.Pane className={'w-100 m-1'} key={index} eventKey={game.title}>
                                    <div className={`w-100 d-flex align-items-center justify-content-center mb-4 mt-1`}>
                                        {renderGame(game)}
                                    </div>
                                </Tab.Pane>
                            )
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default MyClass