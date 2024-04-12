import * as z from "zod";

// export const LoginSchema = z.object({
//   email: z.string().email({
//     message: "Invalid email format",
//   }).optional(), // Making email optional
//   password: z.string().min(1, {
//     message: "Password is required",
//   }).optional(), // Making password optional
//   loginAsGuest: z.boolean(),
// }).refine((data) => {
//   console.log("login schema data",data)
//   if (data.loginAsGuest) {
//     return true; // Return true to bypass validation
//   }
//   // When loginAsGuest is false, email and password must be present
//   return data.email?.length>0 && data.password?.length>0;
// }, {
//   message: "ggg", // No message when loginAsGuest is true
//   path: ["email", "password"],
// });



export const LoginSchema = z.discriminatedUnion("loginAsGuest", [
  z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    loginAsGuest: z.literal(false),
  }),
  z.object({
    email: z.string().email({
      message: "Email is required",
    }).optional().or(z.literal("")),
    password: z.string().min(1, {
      message: "Password is required",
    }).optional().or(z.literal("")),
    loginAsGuest: z.literal(true),
  }),
]);

export const UpdatePasswordSchema=z.object({
  currentPassword: z.string().min(1, {
    message: "Can not be empty",
  }),
  newPassword: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
})

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

const MemberSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const CreateGroupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  members: z
    .array(MemberSchema)
    .min(2, { message: "At least two members required" }),
});

export const MessageSchema = z.object({
  message: z.string().min(1, { message: "Can't send a blank message" }),
});

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ImageUploadSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const NameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name can not be empty" })
    .max(25, { message: "Name can not be more than 25 characters." }),
});

export const AboutSchema = z.object({
  about: z
    .string()
    .min(1, { message: "About can not be empty" })
    .max(100, { message: "About can not exceed 100 characters" }),
});

export const ProfileSettingSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name can not be empty" })
    .max(25, { message: "Name can not be more than 25 characters." })
    .optional()
    .or(z.literal("")),
  about: z
    .string()
    .min(1, { message: "About can not be empty" })
    .max(100, { message: "About can not exceed 100 characters" })
    .optional()
    .or(z.literal("")),
});
