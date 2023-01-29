import pexesoStyles from '../../../styles/games/Pexeso.module.css'

const PexesoCard = ({value, correct, neutral, checked, clickHandler}) => {
    const correctIsNull = correct === null
    return (
        <div
            onClick={clickHandler}
            className={
                `d-flex
                 flex-column
                 align-items-center
                 justify-content-center
                 m-2
                 p-2
                 rounded
                 hoverDarkShadow
                 ${!checked && correctIsNull && !neutral ? pexesoStyles.scaleCardOnHover : ''}
                 ${pexesoStyles.card}
                 ${!correctIsNull && correct ? pexesoStyles.correct : ''}
                 ${!correctIsNull && !neutral && !correct ? pexesoStyles.incorrect : ''}
                 ${neutral && correctIsNull ? pexesoStyles.neutral : ''}
                 ${checked && correctIsNull ? pexesoStyles.checked : ''}`
            }
        >
            {value}
        </div>
    )
}

export default PexesoCard