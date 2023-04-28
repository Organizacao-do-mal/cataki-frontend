import { z } from "zod";

const institutionModel = z.object({
  id: z.number().nullable(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  position: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  address: z.object({
    street: z.string(),
    number: z.number(),
    complement: z.string().optional(),
    zipCode: z.string().regex(/\d{5}-\d{3}/),
  }),
  createAt: z.date().nullable(),
});

export type InstitutionModel = z.infer<typeof institutionModel>;

export class Institution {
  email: string;
  password: string;
  name: string;
  description: string | undefined;
  id: number | null;
  address: {
    number: number;
    street: string;
    zipCode: string;
    complement?: string | undefined;
  };
  image: string | undefined;
  position: { lat: number; lng: number } | undefined;
  createAt: Date | null;

  constructor(readonly params: InstitutionModel) {
    this.validate();

    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.password = params.password;
    this.description = params.description;
    this.address = params.address;
    this.image = params.image;
    this.position = params.position;
    this.createAt = params.createAt;
  }

  private validate() {
    return institutionModel.parse(this.params);
  }
}
