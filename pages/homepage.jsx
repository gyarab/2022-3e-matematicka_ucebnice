import NavBar from "../components/nav-bar/NavBar";
import CustomHead from "../components/utils/CustomHead";
import CustomFooter from "../components/utils/CustomFooter";
import {colorThemeDark, colorThemeLight} from "../lib/env-variables";
import {Button, Card, Container, Row} from "react-bootstrap";
import {useRouter} from "next/router";

/**
 * APPLICATION HOME PAGE
 *
 * - initial signpost
 * - user can get to any class page and gets some information about using this application
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = (props) => {
    /*
    TODO -> create panels as links to classes
    TODO -> how to use this app?
     */

    const router = useRouter()

    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main>
                <NavBar/>
                <div className={'container-fluid m-3'}>
                    <Container>
                        <Row className={'container-fluid justify-content-center align-items-start'}>
                            <Card
                                bg={'primary'}
                                text={'white'}
                                style={{width: '18rem'}}
                                className="m-4 mb-2"
                            >
                                <Card.Body>
                                    <Card.Title>Šestá třída</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant={'secondary'}
                                            onClick={() => router.push('/class/sixth')}>Vstoupit do třídy</Button>
                                </Card.Body>
                            </Card>
                            <Card
                                bg={'primary'}
                                text={'white'}
                                style={{width: '18rem'}}
                                className="m-4 mb-2"
                            >
                                <Card.Body>
                                    <Card.Title>Sedmá třída</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant={'secondary'}
                                            onClick={() => router.push('/class/seventh')}>Vstoupit do třídy</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row className={'container-fluid justify-content-center'}>
                            <Card
                                bg={'primary'}
                                text={'white'}
                                style={{width: '18rem'}}
                                className="m-4 mb-2"
                            >
                                <Card.Body>
                                    <Card.Title>Osmá třída</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant={'secondary'}
                                            onClick={() => router.push('/class/eight')}>Vstoupit do třídy</Button>
                                </Card.Body>
                            </Card>
                            <Card
                                bg={'primary'}
                                text={'white'}
                                style={{width: '18rem'}}
                                className="m-4 mb-2"
                            >
                                <Card.Body>
                                    <Card.Title>Devátá třída</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant={'secondary'}
                                            onClick={() => router.push('/class/ninth')}>Vstoupit do třídy</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default HomePage