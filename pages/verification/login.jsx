import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import {Button, Form} from "react-bootstrap";
import verificationStyles from '../../styles/Verification.module.css'
import {useEffect, useRef, useState} from "react";
import ErrorAnnouncement from "../../components/utils/ErrorAnnouncement";


/**
 * LOGIN PAGE
 *
 * This component gets user input (email, password), which are authenticated on backend. Based on the result user is authenticated or error is showed
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {
    /*
    TODO -> login structure -> which db?, custom account + npm next-auth (Google auth)?
     */

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [validated, setValidated] = useState(false)
    const [err, setErr] = useState({
        isErr: false,
        message: ''
    })

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleLogin = (e) => {
        if (validated)
            e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value
        console.log(email, password)

        /*
        setErr({
            isErr: true,
            message: 'This is the test error!'
        })
         */
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    const handleRemoveError = () => {
        setErr({
            isErr: false,
            message: ''
        })
    }

    return (
        <>
            <CustomHead
                title={'MU - přihlášení'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main style={{height: '100vh'}}>
                <NavBar
                    imgPath={'../android-chrome-512x512.png'}
                />
                <div
                    className={`container-fluid justify-content-center align-items-center ${verificationStyles.formContainer}`}
                >
                    <Form
                        validated={validated}
                        className={`m-1 form ${verificationStyles.customForm}`}
                        noValidate
                        onSubmit={handleSubmit}
                    >

                        <Form.Group
                            className={"mb-3"}
                            controlId={"formBasicEmail"}
                        >
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                required
                                ref={emailRef}
                                type={"email"}
                                placeholder={"Zadejte e-mail..."}
                            />
                            <Form.Control.Feedback type={'invalid'}>E-mail není zadán nebo má špatný formát</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            className={"mb-3"}
                            controlId={"formBasicPassword"}
                        >
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control
                                required
                                ref={passwordRef}
                                type={"password"}
                                placeholder={"Zadejte heslo..."}
                            />
                            <Form.Control.Feedback type={'invalid'}>Heslo není zadáno</Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant={"primary"}
                            type={'submit'}
                            onClick={handleLogin}
                        >
                            Přihlásit
                        </Button>
                    </Form>
                    {
                        err.isErr &&
                        <ErrorAnnouncement
                            onRemoveError={handleRemoveError}
                            message={err.message}
                        />
                    }
                </div>
            </main>
            <CustomFooter/>
        </>
    )
}

export default Login