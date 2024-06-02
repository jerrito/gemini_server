import { z } from "zod";

  

  export const dataSchema=z.object(
    {
    data:z.string(), 
    dataImage:z.string(), 
    title:z.string()    
    }
  )