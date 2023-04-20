//import {generateEquation} from "../generation/equationGeneration.js";
//import pool from "../database/db.js";

/*
const executeSQL = async (query, variables) => {
    return pool.query(query, variables, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }

        return result
    })
}

for (let i = 0; i < 11000; i++) {
    const game = generateEquation(3, 1)
    //console.log(game)
    await executeSQL('select set_choose_correct_game($1, $2, $3, $4, $5);', [game.question, game.correctAnswer, game.difficulty, game.length, game.answers])
}
 */

console.log(new Date().getTime())