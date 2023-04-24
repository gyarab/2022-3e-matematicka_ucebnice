import {isValidRequest} from "../../../lib/utils/requestValidation.js";
import {getChooseCorrectGame} from "../../../lib/database/dbOperations.js";
import {difficultySchema, emailSchema, lengthSchema} from "../../../lib/utils/utils";

export default async function handler(req, res) {
    //console.log(req.body)

    const email = emailSchema.safeParse(req?.body?.email)
    const difficulty = difficultySchema.safeParse(req?.body?.difficulty)
    const length = lengthSchema.safeParse(req?.body?.length)

    if (!email.success || !difficulty.success || !length.success) {
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

    let stage = await getChooseCorrectGame(difficulty.data, length.data, email.data)
    //console.log(stage)

    let response = {
        ok: false,
    }
    if (!(stage === null || typeof stage !== 'object')) {
        response.ok = true
        response.stage = stage
    }

    //console.log(response)

    return res.status(200).json(response)
}