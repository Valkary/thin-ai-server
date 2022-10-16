import { z } from "zod";

export const post_patient_schema = z.object({
  first_names: z.string({ required_error: "Invalid first names" }),
  last_names: z.string({ required_error: "Invalid last names" })
})
