import { CollaboratorController } from "@/controllers/collaborator-controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collaboratorController = new CollaboratorController();

  if (req.method === "POST") {
    try {
      const collaboratorId = await collaboratorController.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: {
          street: req.body.address?.street,
          number: req.body.address?.number,
          zipCode: req.body.address?.zipCode,
          complement: req.body.address?.complement,
        },
      });

      res.status(201).json({
        message: "Instituição criada com sucesso",
        payload: { collaboratorId },
      });
    } catch (error: any) {
      switch (error.name) {
        case "ZodError":
          return res.status(404).json({
            message: "Falha",
            payload: {},
            error: error.issues.map((data: any) => ({
              code: data.code,
              expected: data.expected,
              received: data.received,
              fieldNames: data.path,
              message: data.message,
            })),
          });

        case "Invalid param":
          return res.status(400).json({
            message: error.message,
            payload: {},
            error: error.message,
          });

        default:
          return res.status(500).json({
            message: "Opps, ocorreu um erro no servidor!",
            payload: {},
            error: "Opps, ocorreu um erro no servidor",
          });
      }
    }
  }
}
