import { Request, Response } from "express";
import { UpdateHaircutService } from "../../services/haircut/UpdateHaircutService";

class UpdateHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const { haircut_id, name, price, status } = req.body;

    const updateHaircutService = new UpdateHaircutService();

    const haircutUpdated = await updateHaircutService.execute({
      user_id,
      haircut_id,
      name,
      price,
      status,
    });

    return res.json(haircutUpdated);
  }
}

export { UpdateHaircutController };
