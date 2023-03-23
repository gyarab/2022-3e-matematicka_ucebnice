import verificationStyles from "../../styles/Verification.module.css";
import Image from "next/image";
import {Button} from "react-bootstrap";
import {signIn} from "next-auth/react";
import {googleLogoImagePath, googleLogoAltText} from "../../lib/frontend-env-variables";

const LoginContainer = ({callbackURL}) => {
    const handleGoogleAuthLogin = async (e) => {
        await signIn('google', {callbackUrl: callbackURL})
    }

    return (
        <div className={`w-100 d-flex flex-row align-items-center justify-content-center`}>
            <Button
                variant={"light"}
                type={'button'}
                className={`${verificationStyles.submitButton} m-1 hoverDarkShadow rounded-5`}
                onClick={handleGoogleAuthLogin}
            >
                <Image
                    priority={false}
                    width={200}
                    height={200}
                    src={googleLogoImagePath}
                    alt={googleLogoAltText}
                    onClick={handleGoogleAuthLogin}
                />
            </Button>
        </div>
    );
};

export default LoginContainer;