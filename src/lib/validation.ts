import * as z from "zod";

export const GENDERS = [
  "male",
  "female",
  "other",
  "prefer-not-to-say",
] as const;

// Validation schema for signup form
export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .regex(
        /^[a-zA-Z\u0600-\u06FF\s]+$/,
        "First name must contain only letters"
      ),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .regex(
        /^[a-zA-Z\u0600-\u06FF\s]+$/,
        "Last name must contain only letters"
      ),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z
      .string()
      .trim()
      .transform((val) => {
        const compact = String(val ?? "").replace(/[\s-]/g, "");
        if (compact.startsWith("+98")) return "0" + compact.slice(3);
        if (compact.startsWith("0098")) return "0" + compact.slice(4);
        return compact;
      })
      .refine(
        (val) => /^09\d{9}$/.test(val),
        "Phone number must be a valid Iranian mobile (e.g., 09123456789)"
      ),
    gender: z.enum(GENDERS, {
      message: "invalid option",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    dateOfBirth: z
      .string()
      .trim()
      .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid date format")
      .refine((val) => {
        const dob = new Date(val);
        const age = new Date().getFullYear() - dob.getFullYear();
        const m = new Date().getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && new Date().getDate() < dob.getDate()))
          return age - 1 >= 18;
        return age >= 18;
      }, "You must be at least 18 years old"),
    address: z
      .string()
      .trim()
      .min(10, "Address must be at least 10 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;
