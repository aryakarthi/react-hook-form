import { z } from "zod";

export const BasicUserSchema = z.object({
  id: z.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters!" }),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be at least 4 characters!" }),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().min(10, { message: "Phone must be 10 digits!" }),
  // .regex(/^[0-9]+$/, { message: "Only numbers are allowed!" })
  // .length(10, { message: "Only 10 numbers are allowed!" })
  // .transform(
  //   (value) => `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`
  // ),
  website: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, { message: "URLs must be at least 5 characters!" })
    .refine((val) => val.indexOf(".") !== -1, { message: "Invalid URL!" })
    .optional(),
  // website: z.string().trim().toLowerCase().url().optional(),
  company: z.object({
    name: z
      .string()
      .trim()
      .min(5, { message: "Company name must be at least 5 characters!" }),
    catchPhrase: z.string().optional(),
  }),
});

const UserAddressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(5, { message: "Street must be 5 or more characters long" }),
  suite: z.string().trim().optional(),
  city: z
    .string()
    .trim()
    .min(2, { message: "City must be 2 or more characters long" }),
  zipcode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, {
    message: "Must be 5 digit zip. Optional 4 digit extension allowed.",
  }),
});

const UserAddressSchemaWithGeo = UserAddressSchema.extend({
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
});

const HasIDSchema = z.object({ id: z.number().int().positive() });

// API Schema

export const UserSchemaWithAddress = BasicUserSchema.extend({
  address: UserAddressSchema,
}).merge(HasIDSchema);

export const UserSchemaWithGeo = BasicUserSchema.extend({
  address: UserAddressSchemaWithGeo,
}).merge(HasIDSchema);

export type UserWithAddress = z.infer<typeof UserSchemaWithAddress>;

export type UserWithGeo = z.infer<typeof UserSchemaWithGeo>;

// Register Form Schema

export const UserFormSchemaWithAddress = BasicUserSchema.extend({
  address: UserAddressSchema,
});

export type UserFormWithAddress = z.infer<typeof UserFormSchemaWithAddress>;


