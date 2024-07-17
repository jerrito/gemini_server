import { z } from "zod";


// data schema
export const dataSchema = z.object(
  {
    data: z.string(),
    dataImage: z.any(),
    title: z.string(),
    dataTime: z.date(),
    hasImage: z.boolean()
  }
)

//list data schema
export const listDataSchema = z.object({
  list: z.number().array().nonempty()
})