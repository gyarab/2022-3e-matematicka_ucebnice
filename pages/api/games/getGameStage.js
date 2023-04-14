import { isValidRequest} from "../../../lib/requestValidation";
import { gameList } from "../../../lib/dbOperations";

export default async function handler(req, res) {
    const validation = await isValidRequest(req, 'POST');

    if (!validation.ok) {
        return res.status(validation.status).json({
            err: validation.message
        })
    }

    const content = await gameList.get(1)(1)


    // closed API endpoint
    // get game content based on game id ==> generate JSON specimen object of the request for the stage
    //


    return res.status(200).json({})
}