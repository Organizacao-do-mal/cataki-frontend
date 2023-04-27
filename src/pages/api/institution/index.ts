import { InstitutionController } from "@/controllers/institution-controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const institutionController = new InstitutionController();

  if (req.method === "POST") institutionController.create();
}
