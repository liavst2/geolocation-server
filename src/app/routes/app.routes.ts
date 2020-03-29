

import { Router } from "express";
import { AppCtrl } from "./app.ctrl";

export const appRouter = Router();

appRouter.route("/hello")
  .get(AppCtrl.sayHello)

appRouter.route("/distance")
  .get(AppCtrl.getDistance)

appRouter.route("/health")
  .get(AppCtrl.checkHealth)

appRouter.route("/popularsearch")
  .get(AppCtrl.getMostPopular)
