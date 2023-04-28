import { InstitutionController } from "@/controllers/institution-controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const institutionController = new InstitutionController();

  if (req.method === "POST") {
    try {
      const institutionId = await institutionController.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        address: {
          street: req.body.address?.street,
          number: req.body.address?.number,
          zipCode: req.body.address?.zipCode,
          complement: req.body.address?.complement,
        },
      });

      return res.status(201).json({
        message: "Instituição criada com sucesso",
        payload: { institutionId },
      });
    } catch (error) {
      switch (error.name) {
        case "ZodError":
          return res.status(404).json({
            message: "Falha",
            payload: {},
            error,
          });

        default:
          return res.status(500);
      }
    }
  }
}
