import pexesoStyles from '../../../styles/games/Pexeso.module.css'

const PexesoCard = ({value, correct, neutral, clickHandler}) => {
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
                 ${correctIsNull && !neutral ? pexesoStyles.scaleCardOnHover : ''}
                 ${pexesoStyles.card}
                 ${!correctIsNull && correct ? pexesoStyles.correct : ''}
                 ${!correctIsNull && !neutral && !correct ? pexesoStyles.incorrect : ''}
                 ${correctIsNull && neutral ? pexesoStyles.neutral : ''}`
            }
        >
            {value}
        </div>
    )
}

export default PexesoCard