import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { UserDetailController } from "./controllers/user/UserDetailController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// routes user
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new UserDetailController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

// routes haircut
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);

export default router;
