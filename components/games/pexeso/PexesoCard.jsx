import pexesoStyles from '../../../styles/games/Pexeso.module.css'

const PexesoCard = ({value}) => {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center m-2 p-2 ${pexesoStyles.card}`}>
            {value}
        </div>
    )
}

export default PexesoCard