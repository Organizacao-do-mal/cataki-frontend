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

      res.status(201).json({
        message: "Instituição criada com sucesso",
        payload: { institutionId },
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

  if (req.method === "GET") {
    try {
      const institutions = await institutionController.getAll();

      res.status(200).json({
        message: "Instituiçôes listadas com sucesso",
        payload: institutions.map((institution) => ({
          ...institution,
          description: institution.description.slice(0, 120).concat("..."),
        })),
      });
    } catch (error: any) {
      switch (error.name) {
        case "Institutions not found":
          return res.status(404).json({
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
