import pexesoStyles from '../../../styles/games/Pexeso.module.css'
import gameUtilsStyles from '../../../styles/games/GameUtils.module.css'

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
                 rounded
                 hoverDarkShadow
                 ${!checked && correctIsNull && !neutral ? pexesoStyles.scaleCardOnHover : ''}
                 ${pexesoStyles.card}
                 ${!correctIsNull && correct ? gameUtilsStyles.correct : ''}
                 ${!correctIsNull && !neutral && !correct ? gameUtilsStyles.incorrect : ''}
                 ${neutral && correctIsNull ? pexesoStyles.neutral : ''}
                 ${checked && correctIsNull ? pexesoStyles.checked : ''}`
            }
        >
            {value}
        </div>
    )
}

export default PexesoCard