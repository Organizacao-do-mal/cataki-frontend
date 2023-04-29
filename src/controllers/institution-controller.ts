import { prisma } from "@/lib/prisma";
import { Institution, InstitutionModel } from "@/models/institution";
import { PrismaClient } from "@prisma/client";

export class InstitutionController {
  constructor() {}

  async create({
    email,
    password,
    name,
    description,
    address,
  }: CreateInstitution.Params): Promise<number> {
    const institution = new Institution({
      email,
      password,
      name,
      description,
      address,
      id: null,
      createAt: null,
    });

    await institution.setBounds(institution.address.zipCode);

    const institutionAlreadyExists = await prisma.institution.findMany({
      where: { email: institution.email },
    });

    if (institutionAlreadyExists)
      throw { name: "Invalid param", message: "Email já cadastrado!" };

    const newInstitution = await prisma.institution.create({
      data: {
        email: institution.email,
        password: institution.password,
        name: institution.name,
        description: institution.description,
        houseNumber: institution.address.number,
        street: institution.address.street,
        zipCode: institution.address.zipCode,
        complement: institution.address.complement,
        lat: institution.position?.lat,
        lng: institution.position?.lng,
      },
    });

    return newInstitution.id;
  }
}

namespace CreateInstitution {
  export type Params = Pick<
    InstitutionModel,
    "email" | "password" | "name" | "description" | "address"
  >;
}
