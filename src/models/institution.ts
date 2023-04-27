import { z } from "zod";

const InstitutionModel = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  description: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string(),
  zip_code: z.string().regex(/\d{5}-\d{3}/),
});

export type InstitutionModel = z.infer<typeof InstitutionModel>;
