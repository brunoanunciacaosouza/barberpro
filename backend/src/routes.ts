import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { UserDetailController } from "./controllers/user/UserDetailController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController";
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// routes user
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new UserDetailController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

// routes haircut
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle);
router.get(
  "/haircut/check",
  isAuthenticated,
  new CheckSubscriptionController().handle
);
router.get(
  "/haircut/count",
  isAuthenticated,
  new CountHaircutsController().handle
);
router.get(
  "/haircut/detail",
  isAuthenticated,
  new DetailHaircutController().handle
);

// routes service
router.post("/schedule", isAuthenticated, new NewScheduleController().handle);
router.get("/schedule", isAuthenticated, new ListScheduleController().handle);
router.delete(
  "/schedule",
  isAuthenticated,
  new FinishScheduleController().handle
);

export default router;
