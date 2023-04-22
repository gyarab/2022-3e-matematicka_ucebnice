import {isValidRequest} from "../../../lib/utils/requestValidation.js";
import {gameList} from "../../../lib/database/dbOperations.js";
import {difficultySchema, emailSchema, gameIdSchema, lengthSchema} from "../../../lib/utils/utils";

export default async function handler(req, res) {
    //console.log(req.body)

    const gameId = gameIdSchema.safeParse(req?.body?.gameId)
    const email = emailSchema.safeParse(req?.body?.email)
    const difficulty = difficultySchema.safeParse(req?.body?.difficulty)
    const length = lengthSchema.safeParse(req?.body?.length)

    if (!gameId.success || !email.success || !difficulty.success || !length.success) {
        return res.status(400).json({
            err: 'Required body parameters are not valid.'
        })
    }
    // console.log(gameId.data, email.data, difficulty.data, length.data)

    const validation = await isValidRequest(req, email.data, 'POST');
    if (!validation.ok) {
        return res.status(validation.status).json({
            err: validation.message
        })
    }

    let stage = await gameList.get(gameId.data)(difficulty.data, length.data, email.data, gameId.data)
    //console.log(stage)

    let response = {
        ok: false,
    }
    if (!(stage === null || typeof stage !== 'object')) {
        response.ok = true
        response.stage = stage
    }

    console.log(response)

    return res.status(200).json(response)
}