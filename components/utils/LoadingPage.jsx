import {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";

/**
 * LOADING PAGE
 *
 * - this component displays loading spinner when getting user session
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingPage = () => {
    const [dotNumber, setDotNumber] = useState(1)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDotNumber(prevState => (prevState + 1) % 4)
        }, 333)

        return () => timeout
    }, [dotNumber])

    const renderDots = () => {
        let dots = ''

        for (let i = 0; i < dotNumber; i++) {
            dots += '.'
        }

        return dots
    }

    return (
        <div className={`d-flex align-items-center justify-content-center w-100 vh-100`}>
            <div className={`d-flex flex-column align-items-center justify-content-center`}>
                <div>
                    Loading
                    {
                        renderDots()
                    }
                </div>
                <Spinner animation={"border"} variant={"primary"} className={'mt-3'}/>
            </div>
        </div>
    )
}

export default LoadingPage