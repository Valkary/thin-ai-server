import { z } from "zod";

export const post_appointment_schema = z.object({
  patient_id: z.number({ required_error: "patient_id needs to be a integer greater than 0" }).int().min(1),
  date : z.preprocess((a) => new Date(z.string().parse(a)), z.date()),
  description: z.string({ required_error: "description field is needs to be a string" }).optional()
});

export type Appointment = z.TypeOf<typeof post_appointment_schema>;
