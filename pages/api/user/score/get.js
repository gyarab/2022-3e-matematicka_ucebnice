import {emailSchema} from "../../../../lib/utils/utils";
import {isValidRequest} from "../../../../lib/utils/requestValidation";
import {addScore, getScore} from "../../../../lib/database/dbOperations";

export default async function handler(req, res) {
    const email = emailSchema.safeParse(req?.body?.email)

    if (!email.success) {
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

    const score = await getScore(email.data)

    return res.status(200).json({
        ok: true,
        score: score
    })
}