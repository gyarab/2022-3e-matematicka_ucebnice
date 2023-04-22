import pool from "../../../lib/database/db";
import {generateEquation} from "../../../lib/generation/equationGeneration";

export default async function handler(req, res) {
    const client = await pool.connect()
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
        }
    }

    client.end()
    return res.status(200).json({})
}