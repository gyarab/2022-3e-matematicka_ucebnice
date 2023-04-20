import { isValidRequest} from "../../../lib/utils/requestValidation.js";
import { gameList } from "../../../lib/database/dbOperations.js";
import {z} from "zod";

export default async function handler(req, res) {
    console.log(req.body)

    const gameIdSchema = z.number().max(1000)
    const emailSchema = z.string().email().min(5)

    const gameId = gameIdSchema.safeParse(req?.body?.gameId)
    const email = emailSchema.safeParse(req?.body?.email)

    if (!gameId.success || ! email.success) {
        return res.status(400).json({
            err: 'Required body parameters are not valid.'
        })
    }
    console.log(gameId.data, email.data)

    const validation = await isValidRequest(req, email.data, 'POST');
    if (!validation.ok) {
        return res.status(validation.status).json({
            err: validation.message
        })
    }

    const stage = gameList.get(gameId.data)(email.data)

    //const content = await gameList.get(1)(1, 3, validation.session)


    // closed API endpoint
    // get game content based on game id ==> generate JSON specimen object of the request for the stage
    //


    return res.status(200).json({

    })
}