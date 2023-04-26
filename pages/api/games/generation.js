import pool from "../../../lib/database/db";
import {
    generateEquation,
    generateSorterGameObject,
    getRandomBoolean,
    getRandomInt
} from "../../../lib/generation/equationGeneration";

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
            for (let i = 0; i < 1000; i++) {
                try {
                    await client.query('BEGIN')

                    let choice = getRandomInt(0, 2);
                    let pair = {
                        key: '',
                        value: ''
                    }
                    if (choice === 0) {
                        let a = getRandomInt(10, 20);
                        let b = getRandomInt(0, 9);
                        pair.key = `${a * b}`
                        pair.value = a + " * " + b
                    } else if (choice === 1) {
                        let a = getRandomInt(0, 100) + 100;
                        let b = getRandomInt(0, 10);

                        const isMinus = getRandomBoolean()
                        const key = isMinus ? `${a - b}` : `${a + b}`
                        const value = isMinus ? `${a} - ${b}` : `${a} + ${b}`
                        pair.key = key
                        pair.value = value
                    } else if (choice === 2) {
                        let a = getRandomInt(5, 20);
                        pair.key = `${a}`
                        pair.value = "√" + a * a
                    }

                    await client.query('select set_equal_pair($1, $2, $3);', [4, pair.key, pair.value])

                    await client.query('COMMIT')
                } catch (e) {
                    await client.query('ROLLBACK')
                    console.log(e)
                }
            }
            break
        case 5:
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 100; i++) {
                    try {
                        await client.query('BEGIN')

                        const items = generateSorterGameObject(5, j)
                        console.log(items)

                        await client.query('select set_sorter_game($1, $2, $3)', [1, 3, items])

                        await client.query('COMMIT')
                    } catch (e) {
                        await client.query('ROLLBACK')
                        console.log(e)
                        i--
                    }
                }
            }
            break
        default:
            console.log('bruh, wrong gameId')
    }


    client.end()
    return res.status(200).json({})
}