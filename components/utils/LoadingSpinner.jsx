import {Spinner} from "react-bootstrap";
import loaderStyles from '../../styles/Loader.module.css'
import {useEffect, useState} from "react";

const initialState = '.'
const timeout = 333

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
    const [dots, setDots] = useState(initialState)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (dots.length < 3)
                setDots(prevState => (prevState + initialState))
            else
                setDots(initialState)
        }, timeout)
        return () => clearTimeout(timer)
    }, [dots])

    return (
        <div className={`${loaderStyles.container} mb-4`}>
            <div className={`${loaderStyles.innerContainer} p-4`}>
                <div>
                    Loading{dots}
                </div>
                <Spinner animation={"border"} variant={"primary"} className={'mt-3'}/>
            </div>
        </div>
    )
}

export default LoadingSpinner