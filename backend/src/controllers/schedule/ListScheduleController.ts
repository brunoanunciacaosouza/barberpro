import { Request, Response } from "express";
import { ListScheduleService } from "../../services/schedule/ListScheduleService";

class ListScheduleController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const listScheduleService = new ListScheduleService();

    const listSchedule = await listScheduleService.execute({user_id});

    return res.json(listSchedule);
  }
}

export { ListScheduleController };
