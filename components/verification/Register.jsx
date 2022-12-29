import {Button, Form} from "react-bootstrap";
import verificationStyles from "../../styles/Verification.module.css";
import ErrorAnnouncement from "../utils/ErrorAnnouncement";
import {useEffect, useRef, useState} from "react";

const RegisterForm = () => {
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

        setErr({
            isErr: true,
            message: 'This is the test error!'
        })
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
        setValidated(false)
    }

    return (
        <>
            <Form
                validated={validated}
                noValidate
                onSubmit={handleSubmit}
                className={`m-1 form darkShadow ${verificationStyles.customForm}`}
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
                        zadáno.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                    className={"mb-3"}
                    controlId={"formBasicPassword"}
                >
                    <Form.Label className={verificationStyles.description}>Ověření hesla</Form.Label>
                    <Form.Control
                        required
                        ref={passwordAgainRef}
                        type={"password"}
                        placeholder={"Ověřte svoje heslo..."}
                    />
                    <Form.Control.Feedback type={'invalid'} className={verificationStyles.feedback}>Zadejte prosím heslo
                        znovu.</Form.Control.Feedback>
                </Form.Group>

                <Button
                    variant={"primary"}
                    className={`${verificationStyles.submitButton} hoverDarkShadow`}
                    type={'submit'}
                    onClick={handleLogin}
                >
                    Registrovat
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

export default RegisterForm