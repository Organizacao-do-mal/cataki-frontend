import { googleMapApi } from "@/lib/axios";
import { z } from "zod";

const institutionModel = z.object({
  id: z.number().nullable(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  position: z
    .object({
      lat: z.string(),
      lng: z.string(),
    })
    .optional(),
  address: z.object({
    street: z.string(),
    number: z.number(),
    complement: z.string().optional(),
    zipCode: z.string(),
  }),
  createAt: z.date().nullable(),
});

export type InstitutionModel = z.infer<typeof institutionModel>;

export class Institution {
  email: string;
  password: string;
  name: string;
  description: string;
  id: number | null;
  address: {
    number: number;
    street: string;
    zipCode: string;
    complement?: string | undefined;
  };
  image: string | undefined;
  position: { lat: string; lng: string } | undefined;
  createAt: Date | null;

  constructor(private readonly params: InstitutionModel) {
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

  public validate() {
    return institutionModel.parse(this.params);
  }

  public async setPosition(zipCode: string) {
    const bounds = await googleMapApi.post(
      `json?address=${zipCode}&key=${process.env.GOOGLE_GEOLOCATION_KEY}`
    );

    if (!this.position)
      this.position = {
        lat: String(bounds.data.results[0].geometry.location.lat),
        lng: String(bounds.data.results[0].geometry.location.lng),
      };

    this.position.lat = String(bounds.data.results[0].geometry.location.lat);
    this.position.lng = String(bounds.data.results[0].geometry.location.lng);
  }
}
