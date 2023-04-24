import {z} from "zod";

/**
 * Variables for request data validation
 */
export const gameIdSchema = z.number().max(process.env.MAX_GAME_ID).min(process.env.MIN_GAME_ID)
export const emailSchema = z.string().email().min(5)
export const difficultySchema = z.number().max(process.env.MAX_GAME_DIFF).min(process.env.MIN_GAME_DIFF)
export const lengthSchema = z.number().max(process.env.MAX_LENGTH).min(process.env.MIN_LENGTH)


// https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
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

export function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

