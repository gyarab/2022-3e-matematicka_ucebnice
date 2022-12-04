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
    TODO -> add panels' description
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
                <NavBar
                    imgPath={'/android-chrome-512x512.png'}
                />
                <div className={'container-fluid'}>
                    <Container style={{width: '100%'}}>
                        <Row className={'align-items-center justify-content-center'}>
                            <Card
                                bg={'primary'}
                                text={'white'}
                                style={{width: '18rem'}}
                                className="m-4 mb-2"
                            >
                                <Card.Body>
                                    <Card.Title>Šestá třída</Card.Title>
                                    <Card.Text>
                                        Description
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
                                        Description
                                    </Card.Text>
                                    <Button variant={'secondary'}
                                            onClick={() => router.push('/class/seventh')}>Vstoupit do třídy</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row className={'mb-3 align-items-center justify-content-center'}>
                            <Card
                                bg={'primary'}
                                text={'white'}
                                style={{width: '18rem'}}
                                className="m-4 mb-2"
                            >
                                <Card.Body>
                                    <Card.Title>Osmá třída</Card.Title>
                                    <Card.Text>
                                        Description
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
                                        Description
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