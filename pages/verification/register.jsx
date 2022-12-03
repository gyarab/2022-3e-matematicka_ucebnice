import NavBar from "../../components/nav-bar/NavBar";
import CustomHead from "../../components/utils/CustomHead";
import {colorThemeDark, colorThemeLight} from "../../lib/env-variables";
import CustomFooter from "../../components/utils/CustomFooter";
import verificationStyles from "../../styles/Verification.module.css";
import {Button, Form} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import ErrorAnnouncement from "../../components/utils/ErrorAnnouncement";

const Register = (props) => {
    /*
    TODO -> user registration (backend environment)
     */

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordAgainRef = useRef(null)

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
        const passwordAgain = passwordAgainRef.current.value
        console.log(email, password, passwordAgain)
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
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
                title={'MU - registrace'}
                themeColorLight={colorThemeLight}
                themeColorDark={colorThemeDark}
            />

            <main style={{height: '100vh'}}>
                <NavBar
                    imgPath={'/android-chrome-512x512.png'}
                />
                <div
                    className={`container-fluid justify-content-center align-items-center ${verificationStyles.formContainer}`}
                >
                    <Form
                        validated={validated}
                        noValidate
                        onSubmit={handleSubmit}
                        className={`m-1 form ${verificationStyles.customForm}`}
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
                            <Form.Control.Feedback type={'invalid'}>Heslo není zadáno.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            className={"mb-3"}
                            controlId={"formBasicPassword"}
                        >
                            <Form.Label>Ověření hesla</Form.Label>
                            <Form.Control
                                required
                                ref={passwordAgainRef}
                                type={"password"}
                                placeholder={"Ověřte svoje heslo..."}
                            />
                            <Form.Control.Feedback type={'invalid'}>Zadejte prosím heslo znovu.</Form.Control.Feedback>
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

export default Register