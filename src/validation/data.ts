import { z } from "zod";



export const dataSchema = z.object(
  {
    data: z.string(),
    dataImage: z.any(),
    title: z.string(),
    hasImage: z.boolean()
  }
)

export const listDataSchema = z.object({
  list: z.number().array().nonempty()
})