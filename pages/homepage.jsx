import NavBar from "../components/nav-bar/NavBar";
import CustomHead from "../components/utils/CustomHead";
import CustomFooter from "../components/utils/CustomFooter";
import {colorThemeDark, colorThemeLight} from "../lib/utils/frontend-env-variables.js";
import {Col, Container, Row} from "react-bootstrap";
import HomepageCard from "../components/homepage/HomepageCard";
import {doBackendAuth} from "../components/utils/hooks/doBackendAuth";

/**
 * APPLICATION HOME PAGE
 *
 * - initial signpost for logged users
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

    return (
        <>
            <CustomHead
                title={'Matematická učebnice'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />
            <main className={'mt-5'}>
                <NavBar/>
                <div className={'container-fluid w-100 d-flex flex-row justify-content-center'}>
                        <Row style={{maxWidth: '1000px', width: '100%'}}>
                            <Col className={`d-flex flex-column justify-content-center align-items-center`}>
                                <HomepageCard
                                    title={'Šestá třída'}
                                    description={'Description'}
                                    redirectDestination={'/class/sixth'}
                                />
                                <HomepageCard
                                    title={'Sedmá třída'}
                                    description={'Description'}
                                    redirectDestination={'/class/seventh'}
                                />
                            </Col>
                            <Col className={`d-flex flex-column justify-content-center align-items-center`}>
                                <HomepageCard
                                    title={'Osmá třída'}
                                    description={'Description'}
                                    redirectDestination={'/class/eight'}
                                />
                                <HomepageCard
                                    title={'Devátá třída'}
                                    description={'Description'}
                                    redirectDestination={'/class/ninth'}
                                />
                            </Col>
                        </Row>
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default HomePage

export async function getServerSideProps(context) {
    return doBackendAuth(context, (session) => {
        return { props: {session} }
    })
}