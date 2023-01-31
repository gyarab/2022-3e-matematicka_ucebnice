import dynamic from "next/dynamic";

const ChooseCorrectAnswer = dynamic(() => import('../games/choose-correct-answer/ChooseCorrectAnswer'), {
    ssr: false
})
const Pexeso = dynamic(() => import('../games/pexeso/Pexeso'), {
    ssr: false
})
const CardFlipper = dynamic(() => import('../games/card-flipper/CardFlipper'), {
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
                        game={game.content}
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