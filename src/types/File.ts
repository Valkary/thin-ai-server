import { z } from "zod";

export const UploadedFile = z.object({
  fieldname: z.string({ required_error: "Invalid fieldname" }),
  originalname: z.string({ required_error: "Invalid originalname" }),
  encoding: z.string({ required_error: "Invalid encoding" }),
  mimetype: z.string({ required_error: "Invalid mimetype" }),
  destination: z.string({ required_error: "Invalid destination" }),
  filename: z.string({ required_error: "Invalid filename" }),
  path: z.string({ required_error: "Invalid path" }),
  size: z.number({ required_error: "Size is either not a number or it's size is 0 bytes" }).min(0)
});

export type UploadedFilesType = z.infer<typeof UploadedFile>;

export interface FILE_PATHS {
  path: string,
  name: string
}
