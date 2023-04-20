import { isValidRequest} from "../../../lib/utils/requestValidation.js";
import { gameList } from "../../../lib/database/dbOperations.js";

export default async function handler(req, res) {
    const validation = await isValidRequest(req, 'POST');

    if (!validation.ok) {
        return res.status(validation.status).json({
            err: validation.message
        })
    }

    const gameId = req.body.gameId

    const stage = gameList.get()

    //const content = await gameList.get(1)(1, 3, validation.session)


    // closed API endpoint
    // get game content based on game id ==> generate JSON specimen object of the request for the stage
    //


    return res.status(200).json({
        req: req.body
    })
}