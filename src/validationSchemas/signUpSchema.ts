import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long." }),
  username: z
    .string({ message: "Username is a required field." })
    .min(5, { message: "The username needs to be at least 5 characters long." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is a required field." })
    .min(6, { message: "The password needs to be at least 6 characters long." }),
  avatar: z.object({}).optional(),
});
