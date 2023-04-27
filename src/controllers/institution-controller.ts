import { prisma } from "@/lib/prisma";
import { InstitutionModel } from "@/models/institution";

export class InstitutionController {
  constructor() {}

  async create({
    email,
    password,
    name,
    description,
    street,
    number,
    complement,
    zip_code,
  }: CreateInstitution.Params): CreateInstitution.Result {
    
  }
}

namespace CreateInstitution {
  export type Params = InstitutionModel;
  export type Result = Promise<void>;
}
