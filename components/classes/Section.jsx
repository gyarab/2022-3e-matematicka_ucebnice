import ChooseCorrectAnswer from "../games/choose-correct-answer/ChooseCorrectAnswer";

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
            default:
                return <div>Fail to load + {id}</div>
        }
    }

    return (
        <li id={id}>
            <h2>{title}</h2>
            <ul>
                {games.map((game, index) => {
                    return (
                        <li
                            key={index}
                        >
                            <div>
                                {game.title}
                                {
                                    renderGame(game)
                                }
                            </div>

                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

export default Section