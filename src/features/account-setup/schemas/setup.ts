import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string(),
  barangay: z.string(),
  city: z.string(),
  postal_code: z.string(),
});

export const ProfileSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  profile: z.string().url().optional(),
  subscribe: z.boolean(),
  image: z.string().optional(),
});

export const ImageSchema = z.object({
  image: z.instanceof(File),
});
