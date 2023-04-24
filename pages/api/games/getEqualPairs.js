import {isValidRequest} from "../../../lib/utils/requestValidation.js";
import {getEqualPairs} from "../../../lib/database/dbOperations.js";
import {difficultySchema, emailSchema, gameIdSchema, lengthSchema, replacer} from "../../../lib/utils/utils";

export default async function handler(req, res) {
    //console.log(req.body)

    const gameId = gameIdSchema.safeParse(req?.body?.gameId);
    const email = emailSchema.safeParse(req?.body?.email)
    const difficulty = difficultySchema.safeParse(req?.body?.difficulty)
    const size = lengthSchema.safeParse(req?.body?.size)

    if (!email.success || !difficulty.success || !size.success || !gameId.success) {
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

    let pairs = await getEqualPairs(difficulty.data, size.data, email.data, gameId.data)
    //console.log(stage)

    let response = {
        ok: false,
    }
    if (!(pairs === null || typeof pairs !== 'object')) {
        response.ok = true
        response.pairs = JSON.stringify(pairs, replacer)
    }

    console.log(response.pairs)

    return res.status(200).json(response)
}