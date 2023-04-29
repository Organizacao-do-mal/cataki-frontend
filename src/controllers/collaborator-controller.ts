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
}

namespace CreateCollaborator {
  export type Params = Pick<
    CollaboratorModel,
    "email" | "password" | "name" | "address"
  >;
  export type Result = number;
}
