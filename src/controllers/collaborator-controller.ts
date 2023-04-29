import { prisma } from "@/lib/prisma";
import { Collaborator, CollaboratorModel } from "@/models/collaborator";
import bcrypt from "bcryptjs";

export class CollaboratorController {
  constructor() {}

  async create({
    email,
    password,
    name,
    address,
  }: CreateCollaborator.Params): Promise<CreateCollaborator.Result> {
    const collaborator = new Collaborator({
      email,
      password,
      name,
      address,
      id: null,
      createAt: null,
    });

    collaborator.validate();

    const collaboratorAlreadyExists = await prisma.collaborator.findFirst({
      where: { email: collaborator.email },
    });

    if (collaboratorAlreadyExists)
      throw { name: "Invalid param", message: "Email já cadastrado!" };

    await collaborator.setPosition(collaborator.address.zipCode);

    const hashedPassword = bcrypt.hashSync(collaborator.password);

    const newCollaborator = await prisma.collaborator.create({
      data: {
        email: collaborator.email,
        password: hashedPassword,
        name: collaborator.name,
        houseNumber: collaborator.address.number,
        street: collaborator.address.street,
        zipCode: collaborator.address.zipCode,
        complement: collaborator.address.complement,
        lat: collaborator.position?.lat,
        lng: collaborator.position?.lng,
      },
    });

    return newCollaborator.id;
  }

  async getById({
    collaboratorId,
  }: GetCollaboratorById.Params): Promise<GetCollaboratorById.Result> {
    const collaborator = await prisma.collaborator.findFirst({
      select: {
        email: true,
        name: true,
        street: true,
        houseNumber: true,
        complement: true,
        zipCode: true,
      },
      where: { id: collaboratorId },
    });

    if (!collaborator)
      throw {
        name: "Collaborator not found",
        message: "Colaborador não encontrada",
      };

    return {
      email: collaborator.email,
      name: collaborator.name,
      address: {
        street: collaborator.street,
        number: collaborator.houseNumber,
        complement: collaborator.complement,
        zipCode: collaborator.zipCode,
      },
    };
  }
}

namespace CreateCollaborator {
  export type Params = Pick<
    CollaboratorModel,
    "email" | "password" | "name" | "address"
  >;
  export type Result = number;
}

namespace GetCollaboratorById {
  export type Params = { collaboratorId: number };
  export type Result = {
    email: string;
    name: string;
    address: {
      street: string;
      number: number;
      complement: string | null;
      zipCode: string;
    };
  };
}
