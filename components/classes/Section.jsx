import dynamic from "next/dynamic";
import LoadingSpinner from "../utils/LoadingSpinner";

const ChooseCorrectAnswer = dynamic(() => import('../games/choose-correct-answer/ChooseCorrectAnswer'), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const Pexeso = dynamic(() => import('../games/pexeso/Pexeso'), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const CardFlipper = dynamic(() => import('../games/card-flipper/CardFlipper'), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const TrueFalseGame = dynamic(() => import("../games/true-false-game/TrueFalseGame"), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const SorterGame = dynamic(() => import("../games/sorter-game/SorterGame"), {
    loading: () => <LoadingSpinner/>,
    ssr: false
})
const Geometry = dynamic(() => import("../games/geometry/Geometry"),{
    loading: () => <LoadingSpinner/>,
    ssr: false
})

const Section = ({id, title, games}) => {

    const renderGame = (game) => {
        switch (game.id) {
            case 0:
                return <div>Nothing</div>
            case 1:
                return (
                    <ChooseCorrectAnswer
                        gameLength={game.gameLength}
                        size={game.size}
                        difficulty={game.difficulty}
                    />
                )
            case 2:
                return (
                    <Pexeso
                        size={game.size}
                        difficulty={game.difficulty}
                    />
                )
            case 3:
                return (
                    <CardFlipper
                        size={game.size}
                        difficulty={game.difficulty}
                    />
                )
            case 4:
                return (
                    <TrueFalseGame
                        size={game.size}
                        difficulty={game.difficulty}
                    />
                )
            case 5:
                return (
                    <SorterGame
                        gameLength={game.gameLength}
                        size={game.size}
                        difficulty={game.difficulty}
                    />
                )
            case 6:
                return (
                    <Geometry
                    
                    />
                )
            default:
                return <div>Fail to load + {id}</div>
        }
    }

    return (
        <li id={id}>
            <h2>{title}</h2>
            <ul
                className={`p-2`}
            >
                {games.map((game, index) => {
                    return (
                        <li
                            key={index}
                        >
                            <div>
                                {game.title}
                                <div className={'d-flex flex-row justify-content-center align-items-center'}>
                                    {
                                        renderGame(game)
                                    }
                                </div>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

export default Section