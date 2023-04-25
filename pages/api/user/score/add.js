import {emailSchema, gameIdSchema, scoreSchema} from "../../../../lib/utils/utils";
import {isValidRequest} from "../../../../lib/utils/requestValidation";
import {addScore} from "../../../../lib/database/dbOperations";

export default async function handler(req, res) {
    const gameId = gameIdSchema.safeParse(req?.body?.gameId)
    const email = emailSchema.safeParse(req?.body?.email)
    const incorrect = scoreSchema.safeParse(req?.body?.incorrect)
    const correct = scoreSchema.safeParse(req?.body?.correct)

    if (!email.success || !gameId.success || !incorrect.success || !correct.success) {
        return res.status(400).json({
            err: 'Required body parameters are not valid.'
        })
    }

    const validation = await isValidRequest(req, email.data, 'POST');
    if (!validation.ok) {
        return res.status(validation.status).json({
            err: validation.message
        })
    }

    await addScore(email.data, gameId.data, incorrect.data, correct.data)

    return res.status(200).json({
        ok: true
    })
}