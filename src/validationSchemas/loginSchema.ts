import { z } from "zod";

export const emailValidationRegExp = new RegExp(
   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);

export const loginSchema = z.object({
   credentials: z
      .string()
      .min(1, { message: "Username is required." })
      .refine(
         (value) => (value.includes("@") ? emailValidationRegExp.test(value) : true),
         { message: "Not a valid email address." }
      ),
   password: z.string().min(1, { message: "Password is required." }),
});
