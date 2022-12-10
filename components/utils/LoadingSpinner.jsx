import {Spinner} from "react-bootstrap";
import loaderStyles from '../../styles/Loader.module.css'
import {useEffect, useState} from "react";

/**
 * LOADING SPINNER
 *
 * - this component displays loading spinner
 * - should be used while lazy loading some other component
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingSpinner = () => {
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
        <div className={`${loaderStyles.container} mb-4`}>
            <div className={`${loaderStyles.innerContainer} p-4`}>
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

export default LoadingSpinner