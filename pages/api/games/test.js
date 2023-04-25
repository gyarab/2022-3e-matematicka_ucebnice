import pool from "../../../lib/database/db";
import {generateEquation, generateSorterGameObject, getRandomInt} from "../../../lib/generation/equationGeneration";

export default async function handler(req, res) {
    const client = await pool.connect()
    switch (req.body.gameId) {
        case 1:
            for (let i = 0; i < 10; i++) {
                try {
                    await client.query('BEGIN')

                    const game = generateEquation(3, 1)
                    console.log(game)
                    await client.query('select set_choose_correct_game($1, $2, $3, $4, $5);', [game.question, game.correctAnswer, game.difficulty, game.length, game.answers])

                    await client.query('COMMIT')
                } catch (e) {
                    await client.query('ROLLBACK')
                    console.log(e)
                    i--
                }
            }
            break
        case 2:
        case 3:
        case 4:
            for (let i = 0; i < 10; i++) {
                try {
                    await client.query('BEGIN')

                    let a = getRandomInt(0, 10);
                    let b = getRandomInt(0, 10);
                    // `${a * b}`; `${a} * ${b}`

                    await client.query('select set_equal_pair($1, $2, $3);', [1, `${a * b}`, `${a} * ${b}`])

                    await client.query('COMMIT')
                } catch (e) {
                    await client.query('ROLLBACK')
                    console.log(e)
                    i--
                }
            }
            break
        case 6:
            for (let i = 0; i < 10; i++) {
                try {
                    await client.query('BEGIN')

                    const sorterGame = generateSorterGameObject(3, 1)

                    await client.query('select set_equal_pair($1, $2, $3);', [1, `${a * b}`, `${a} * ${b}`])

                    await client.query('COMMIT')
                } catch (e) {
                    await client.query('ROLLBACK')
                    console.log(e)
                    i--
                }
            }
            break
        default:
            console.log('bruh, wrong gameId')
    }


    client.end()
    return res.status(200).json({})
}