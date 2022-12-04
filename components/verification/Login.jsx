import {Button, Form} from "react-bootstrap";
import verificationStyles from "../../styles/Verification.module.css";
import ErrorAnnouncement from "../utils/ErrorAnnouncement";
import {useEffect, useRef, useState} from "react";

const LoginForm = () => {
    const emailRef = useRef('')
    const passwordRef = useRef('')

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

        setErr({
            isErr: true,
            message: 'This is the test error!'
        })
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
        setValidated(false)
    }

    return (
        <>
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
                    <Form.Label className={verificationStyles.description}>E-mail</Form.Label>
                    <Form.Control
                        required
                        ref={emailRef}
                        type={"email"}
                        placeholder={"Zadejte e-mail..."}
                    />
                    <Form.Control.Feedback type={'invalid'} className={verificationStyles.feedback}>E-mail není zadán
                        nebo má špatný formát</Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                    className={"mb-3"}
                    controlId={"formBasicPassword"}
                >
                    <Form.Label className={verificationStyles.description}>Heslo</Form.Label>
                    <Form.Control
                        required
                        ref={passwordRef}
                        type={"password"}
                        placeholder={"Zadejte heslo..."}
                    />
                    <Form.Control.Feedback type={'invalid'} className={verificationStyles.feedback}>Heslo není
                        zadáno</Form.Control.Feedback>
                </Form.Group>
                <Button
                    variant={"primary"}
                    type={'submit'}
                    className={verificationStyles.submitButton}
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
        </>
    )
}

export default LoginForm