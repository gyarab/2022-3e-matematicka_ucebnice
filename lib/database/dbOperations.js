import pool from './db.js'
import {shuffleArray} from "../generation/equationGeneration";


export async function getChooseCorrectGame(difficulty, length, email) {
    //console.log(difficulty, length, email);

    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        let game = (await client.query('select get_choose_correct_stage($1, $2, $3)', [difficulty, length, email])).rows
        //console.log(game)
        await client.query('COMMIT')

        if ((!game?.length || game[0]?.get_choose_correct_stage === '(,,)') ?? true)
            return null

        game = JSON.parse(game[0].get_choose_correct_stage.replace('(', '[').replace(')', ']'))
        game = {
            question: game[0],
            correctAnswer: game[1],
            answers: shuffleArray([...(JSON.parse(game[2].replace('{', '[').replace('}', ']'))), game[1]]),
        }

        return game
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

    return null
}

export async function getPexesoGame(difficulty, size, email) {
    console.log(difficulty, size, email);

    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        let game = (await client.query('select get_equal_pairs($1, $2, $3)', [difficulty, size, email])).rows
        //console.log(game)
        await client.query('COMMIT')

        // || game[0]?.get_choose_correct_stage === '(,,)'
        if ((!game?.length ) ?? true)
            return null

        game = game[0].get_equal_pairs
        let list = new Map()

        for (let i = 0; i < game.length; i++) {
            game[i] = game[i].substring(1, game[i].length - 1).split(",")
            game[i][1] = game[i][1].substring(1, game[i][1].length - 1)
            list.set(game[i][0], game[i][1]);
        }

        return list
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

    return null
}

export default async function isAuthorized(email) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const verified = (await client.query('select verify_user($1)', [email])).rows[0].verify_user
        await client.query('COMMIT')

        return verified
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }

    return false
}