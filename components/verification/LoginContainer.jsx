import verificationStyles from "../../styles/Verification.module.css";
import Image from "next/image";
import {Button} from "react-bootstrap";
import {signIn} from "next-auth/react";
import {googleLogoImagePath, googleLogoAltText} from "../../lib/frontend-env-variables";

const LoginContainer = () => {
    const handleGoogleAuthLogin = async (e) => {
        await signIn('google')
    }

    return (
        <div className={`w-100 d-flex flex-column justify-content-center darkShadow ${verificationStyles.customForm}`}>
            <h2 className={`p-2 ${verificationStyles.title}`}>
                Přihlášení
            </h2>
            <Button
                variant={"light"}
                type={'button'}
                className={` w-100 d-flex justify-content-center align-items-center m-1 hoverDarkShadow rounded ${verificationStyles.submitButton}`}
                onClick={handleGoogleAuthLogin}
            >
                <Image
                    priority={false}
                    width={50}
                    height={50}
                    src={googleLogoImagePath}
                    alt={googleLogoAltText}
                    onClick={handleGoogleAuthLogin}
                />
            </Button>
        </div>
    );
};

export default LoginContainer;