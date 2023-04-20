import pool from './db.js'

export const gameList = new Map([
    [1, getChooseCorrectGame],
]);

const executeSQL = async (query, variables) => {
    return await pool.query(query, variables).then(result => {
        //console.log(result.rows[0].verify_user)
        return result
    }).catch(err => {
        return console.error('Error executing query', err.stack)
    })
}

export async function getChooseCorrectGame(difficulty, length) {
    console.log(difficulty, length);
    const query = 'select question, correct_answer, ARRAY(select answer from choose_correct_game_answers where ) from choose_correct_game as cg'


}

export default async function isAuthorized(email) {
    return (await executeSQL('select verify_user($1);', [email])).rows[0].verify_user
}