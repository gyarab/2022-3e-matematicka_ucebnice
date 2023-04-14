import pool from './db'

export const gameList = new Map([
    [1, getGameStage],
    [2, getGameStage],
    [3, getGameStage],
    [4, getGameStage]
]);



export default async function getGameStage(gameId) {
    console.log(gameId)
}