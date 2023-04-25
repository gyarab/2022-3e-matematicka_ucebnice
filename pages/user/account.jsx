import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {
    colorThemeDark,
    colorThemeLight,
    heroImageAltText,
    heroImagePath
} from "../../lib/utils/frontend-env-variables.js";
import CustomFooter from "../../components/utils/CustomFooter";
import HeroImage from "../../components/classes/HeroImage";
import {doBackendAuth} from "../../components/utils/hooks/doBackendAuth";
import {useEffect, useState} from "react";
import axios from "axios";
import {Badge, Button, Card, ListGroup} from "react-bootstrap";
import accountStyles from "../../styles/Account.module.css"


const Account = (email) => {
    const [score, setScore] = useState([]);
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        getUserScore()
        getUserInfo()
    }, []);

    const getUserInfo = () => {
        axios.post('/api/user/info/get', {
            ...email
        }).then((res) => {
            //console.log(res);
            setUserInfo(res.data.userInfo)
        }).catch(err => console.log(err))
    }

    const getUserScore = () => {
        axios.post('/api/user/score/get', {
            ...email
        }).then((res) => {
            //console.log(res);
            setScore(res.data.score)
        }).catch(err => console.log(err))
    }

    const handleResetStatistics = () => {
        axios.post('/api/user/score/reset', {
            ...email
        }).then((res) => {
            //console.log(res);
            getUserScore()
        }).catch(err => console.log(err))
    }

    return (
        <>
            <CustomHead
                title={'MU - šestá třída'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main className={'mt-5'}>
                <NavBar
                    activeRoute={'/user/account'}
                />
                <HeroImage
                    imagePath={heroImagePath}
                    altText={heroImageAltText}
                    description={'Můj účet'}
                />
                <div className={`container-fluid w-100 d-flex flex-column justify-content-center align-items-center`}>
                    <Card className={`mt-4`}>
                        <Card.Body>
                            <Card.Title className={`fw-bold`}>Vítejte na svém profilu!</Card.Title>
                            <Card.Subtitle className={"mb-2 text-muted"}>{userInfo}</Card.Subtitle>
                            <Card.Text>
                                V sekci níže můžete naleznout vaše dosavadní skóre ve hrách, které jste si již vyzkoušel/a.
                            </Card.Text>
                            <Button variant={'outline-secondary'} onClick={() => handleResetStatistics()}>Resetovat statistiky</Button>
                        </Card.Body>
                    </Card>
                    <ListGroup as={"ol"} className={`w-100 m-4`} style={{maxWidth: '686.6px'}}>
                        {score.map((arr, index) => {
                            const name = arr[0]
                            const incorrect = arr[1]
                            const correct = arr[2]
                            const incorrectPercentage = Math.floor((100 * incorrect) / (correct + incorrect))
                            const correctPercentage = 100 - incorrectPercentage
                            return (
                                <ListGroup.Item
                                    key={index}
                                    as={"li"}
                                    className={"d-flex justify-content-between align-items-start"}
                                >
                                    <div className={"w-100 ms-2 me-auto"}>
                                        <div className={"fw-bold"}>{name}</div>
                                        <ListGroup as={"ol"} className={`mt-4 m-3`} style={{maxWidth: '400px'}}>
                                            <ListGroup.Item
                                                key={name + ' first'}
                                                as={"li"}
                                                className={"d-flex justify-content-between align-items-start"}
                                            >
                                                <div className={accountStyles.incorrect}>špatné odpovědi:</div>
                                                <div>{incorrect}</div>
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                key={name + ' second'}
                                                as={"li"}
                                                className={"d-flex justify-content-between align-items-start"}
                                            >
                                                <div className={accountStyles.correct}>správné odpovědi:</div>
                                                <div>{correct}</div>
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                key={name + ' third'}
                                                as={"li"}
                                                className={"d-flex justify-content-between align-items-start"}
                                            >
                                                <div>celkem:</div>
                                                <div>{correct + incorrect}</div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <div className={`d-flex flex-column align-items-center justify-content-center`}>
                                        <Badge bg={"danger"} className={`w-100 m-1`}>
                                            {incorrectPercentage + '%'}
                                        </Badge>
                                        <Badge bg={"success"} className={`w-100 m-1`}>
                                            {correctPercentage + '%'}
                                        </Badge>
                                    </div>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>
            </main>

            <CustomFooter/>
        </>

    )
}

export default Account

export async function getServerSideProps(context) {
    return doBackendAuth(context, (session) => {
        return {props: {email: session.user.email}}
    })
}