import { CollaboratorController } from "@/controllers/collaborator-controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collaboratorController = new CollaboratorController();

  if (req.method === "GET") {
    try {
      const collaborator = await collaboratorController.getById({
        collaboratorId: Number(req.query.collaboratorId),
      });

      res.status(200).json({
        message: "Colaborador listado com sucesso",
        payload: collaborator,
      });
    } catch (error: any) {
      switch (error.name) {
        case "Collaborator not found":
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
