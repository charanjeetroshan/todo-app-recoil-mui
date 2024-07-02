import { z } from "zod";

export const loginSchema = z.object({
  credentials: z
    .string()
    .min(1, { message: "Username / Email is required." })
    .refine((value) => (value.includes("@") ? z.string().email() : z.string().min(1))),
  password: z.string().min(1, { message: "Password is required." }),
});
