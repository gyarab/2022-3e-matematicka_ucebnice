import {z} from "zod";

/**
 * Variables for request data validation
 */
export const gameIdSchema = z.number().max(process.env.MAX_GAME_ID).min(process.env.MIN_GAME_ID)
export const emailSchema = z.string().email().min(5)
export const difficultySchema = z.number().max(process.env.MAX_GAME_DIFF).min(process.env.MIN_GAME_DIFF)
export const lengthSchema = z.number().max(process.env.MAX_LENGTH).min(process.env.MIN_LENGTH)
export const scoreSchema = z.number().max(process.env.MAX_SCORE).min(process.env.MIN_SCORE)


/**
 * REPLACER
 *
 * This method allows JS Map() object serialization
 *
 * @param key
 * @param value
 * @returns {{dataType: string, value: [unknown, unknown][]}|*}
 */
export function replacer(key, value) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

/**
 * RECIEVER
 *
 * This method has the opposite function than the replacer(key, value)
 *
 * @param key
 * @param value
 * @returns {Map<unknown, unknown>|*}
 */
export function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

