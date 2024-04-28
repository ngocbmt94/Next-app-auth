import { z } from "zod";

export const userSignUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .refine((value) => value.trim() !== "" && value.includes("@"), { message: "Invalid email" }),
  password: z.string().min(6, "The password must be at least 6 characters long").max(8, "The password must be a maximun 8 characters"),
});
