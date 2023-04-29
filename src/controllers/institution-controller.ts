import { prisma } from "@/lib/prisma";
import { Institution, InstitutionModel } from "@/models/institution";
import bcrypt from "bcryptjs";

export class InstitutionController {
  constructor() {}

  async create({
    email,
    password,
    name,
    description,
    address,
  }: CreateInstitutionParams): Promise<number> {
    const institution = new Institution({
      email,
      password,
      name,
      description,
      address,
      id: null,
      createAt: null,
    });

    institution.validate();

    const [institutionAlreadyExists] = await prisma.institution.findMany({
      where: { email: institution.email },
    });

    if (institutionAlreadyExists)
      throw { name: "Invalid param", message: "Email já cadastrado!" };

    await institution.setPosition(institution.address.zipCode);

    const hashedPassword = bcrypt.hashSync(institution.password);

    const newInstitution = await prisma.institution.create({
      data: {
        email: institution.email,
        password: hashedPassword,
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

  async getAll(): Promise<GetAllInstitutionResult> {
    const institutions = await prisma.institution.findMany({
      select: {
        name: true,
        description: true,
        houseNumber: true,
        street: true,
      },
    });

    if (institutions.length === 0)
      throw {
        name: "Institutions not found",
        message: "Nem uma instituição encontrada!",
      };

    return institutions.map(({ name, description, houseNumber, street }) => ({
      name,
      description: description ?? "Sem descrição",
      number: houseNumber,
      street: street,
    }));
  }

  async getById({
    institutionId,
  }: GetInstitutionById.Params): Promise<GetInstitutionById.Result> {
    const institution = await prisma.institution.findFirst({
      select: {
        email: true,
        name: true,
        description: true,
        street: true,
        houseNumber: true,
        complement: true,
        zipCode: true,
      },
      where: { id: institutionId },
    });

    if (!institution)
      throw {
        name: "Institution not found",
        message: "Instituição não encontrada",
      };

    return {
      email: institution.email,
      name: institution.name,
      description: institution.description ?? "Sem descrição",
      address: {
        street: institution.street,
        number: institution.houseNumber,
        complement: institution.complement,
        zipCode: institution.zipCode,
      },
    };
  }
}

type CreateInstitutionParams = Pick<
  InstitutionModel,
  "email" | "password" | "name" | "description" | "address"
>;

type GetAllInstitutionResult = {
  name: string;
  description: string;
  street: string;
  number: number;
}[];

namespace GetInstitutionById {
  export type Params = { institutionId: number };

  export type Result = {
    email: string;
    name: string;
    description: string;
    address: {
      street: string;
      number: number;
      complement: string | null;
      zipCode: string;
    };
  };
}
