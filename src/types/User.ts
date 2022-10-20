import { z } from "zod";
import { Role } from "@prisma/client";

export const post_user_data = z.object({
  username: z.string({ required_error: "Username must be of type string" }),
  names: z.string({ required_error: "First names must be of type string" }),
  last_names: z.string({ required_error: "Last names must be of type string" }),
  password: z.string({ required_error: "Password must be of type string" }).min(6, "Password should be at least 6 characters long"),
  security: z.nativeEnum(Role, { required_error: "Security level must be of type Role" }),
  email: z.string({ required_error: "Email must be of type string" }).email(),
});

export const update_password_data = z.object({
  user_id: z.number({ required_error: "User id must be a number" }),
  old_pass: z.string({ required_error: "The old password must be a string" }),
  new_pass: z.string({ required_error: "New password must be a string" })
})

export type UpdatePassType = z.infer<typeof update_password_data>;
export type PostUserType = z.infer<typeof post_user_data>;
