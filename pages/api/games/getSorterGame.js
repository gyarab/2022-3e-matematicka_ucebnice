import {difficultySchema, emailSchema, gameIdSchema, lengthSchema, replacer} from "../../../lib/utils/utils";
import {isValidRequest} from "../../../lib/utils/requestValidation";
import {getEqualPairs, getSorterGame} from "../../../lib/database/dbOperations";

export default async function handler(req, res) {
    //console.log(req.body)

    const email = emailSchema.safeParse(req?.body?.email)
    const difficulty = difficultySchema.safeParse(req?.body?.difficulty)
    const size = lengthSchema.safeParse(req?.body?.size)

    if (!email.success || !difficulty.success || !size.success) {
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

    let items = await getSorterGame(difficulty.data, size.data, email.data)
    //console.log(stage)

    let response = {
        ok: false,
    }
    if (!(items === null || typeof items !== 'object')) {
        response.ok = true
        response.items = items
    }

    //console.log(response.items)

    return res.status(200).json(response)
}