import cardFlipperStyles from '../../../styles/games/CardFlipper.module.css'

// card styling source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card
const CardFlipperCard = ({keyValue, value, isValueShown, flipCard}) => {
    return (
        <div
            onClick={flipCard}
            className={
                `m-2
                 ${cardFlipperStyles.flipCard}`
            }
        >
            <div className={`position-relative w-100 h-100 darkShadow rounded ${cardFlipperStyles.flipCardInner}`}>
                <div className={`d-flex align-items-center justify-content-center position-absolute w-100 h-100 rounded ${cardFlipperStyles.flipCardFront}`}>
                    {`${value} = ?`}
                </div>
                <div className={`d-flex align-items-center justify-content-center position-absolute w-100 h-100 rounded ${cardFlipperStyles.flipCardBack}`}>
                    {keyValue}
                </div>
            </div>
        </div>
    )
}

export default CardFlipperCard