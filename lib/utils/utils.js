import {z} from "zod";

/**
 * Variables for request data validation
 */
export const gameIdSchema = z.number().max(process.env.MAX_GAME_ID).min(process.env.MIN_GAME_ID)
export const emailSchema = z.string().email().min(5)
export const difficultySchema = z.number().max(process.env.MAX_GAME_DIFF).min(process.env.MIN_GAME_DIFF)
export const lengthSchema = z.number().max(process.env.MAX_LENGTH).min(process.env.MIN_LENGTH)