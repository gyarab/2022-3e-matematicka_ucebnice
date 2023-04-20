import isAuthorized from "../database/dbOperations";

/**
 * IS VALID REQUEST
 *
 * This function is validating the request if it could be managed by the API route.
 * First parameter 'req' presents the request object.
 * Second parameter 'method' represents the string value of a required method of the request. ('GET', 'POST', etc.)
 * The last parameter 'shouldBeAuthenticated' represented by a boolean value is optional. Default value is true. If its value is true, it verifies whether the requester is authenticated or not.
 * If there is any mistake while verifying the request, this function returns object including 'ok' value false, 'status' (number of the error status code) and error message describing the problem.
 *
 *
 * @param req
 * @param method
 * @param shouldAuthenticate
 * @returns {Promise<{ok: boolean}|{ok: boolean, message: string, status: number}>}
 */
export async function isValidRequest(req, method, shouldAuthenticate=true) {

    if (req.method !== method) {
        return {
            ok: false,
            status: 400,
            message: 'Invalid request method'
        }
    }

    if (shouldAuthenticate) {
        const valid = await isAuthorized(req.body.email)
        if (!valid) {
            return {
                ok: false,
                status: 401,
                message: 'Not authorized'
            }
        }
    }

    return {
        ok: true
    }
}