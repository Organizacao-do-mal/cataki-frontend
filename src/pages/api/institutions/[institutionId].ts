import { InstitutionController } from "@/controllers/institution-controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const institutionController = new InstitutionController();

  if (req.method === "GET") {
    try {
      console.log(req.query);
      const institution = await institutionController.getById({
        institutionId: Number(req.query.institutionId),
      });

      res.status(200).json({
        message: "Instituição listada com sucesso",
        payload: institution,
      });
    } catch (error: any) {
      switch (error.name) {
        case "Institution not found":
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
