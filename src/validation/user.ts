import { array, number, string, z } from "zod";

export const userValidation = z.object({
    userName: string().min(2,
        "Username must be more than 2 or more characters long"),
    email: string().email(),
    password: string().min(6,
        "Password must be 6 or more characters long")
})

export const passwordSchema = z.object({
    old_password: string().min(6),
    new_password: string().min(6),
    confirm_password: string().min(6),
})

export const imageSchema=z.object({
    data:number().array(),
})