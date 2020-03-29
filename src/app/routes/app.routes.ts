

import { Router } from "express";
import { AppCtrl } from "./app.ctrl";

export const appRouter = Router();

appRouter.route("/hello")
  .get(AppCtrl.helloResponse)

appRouter.route("/distance")
  .get(AppCtrl.getDistance)
