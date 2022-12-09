import {Spinner} from "react-bootstrap";
import loaderStyles from '../../styles/Loader.module.css'
import {useEffect, useState} from "react";

const LoadingSpinner = () => {
    const [dotNumber, setDotNumber] = useState(1)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDotNumber(prevState => (prevState + 1) % 4)
        }, 250)

        console.log(dotNumber)
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
        <div className={`${loaderStyles.container} mb-3`}>
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