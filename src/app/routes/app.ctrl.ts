
import { Request, Response } from "express";
import { AppBL } from "../bl/app.bl";

export namespace AppCtrl {

  export function helloResponse(req: Request, res: Response) {
    res.sendStatus(200);
  }

  export async function getDistance(req: Request, res: Response) {
    const { source, destination } = req.query;
    if (!source || !destination) {
      return res.status(400).send("Must supply source and destination!");
    }
    try {
      const distance = await AppBL.getDistance(source, destination);
      res.status(200).send({ distance });
    } catch (err) {
      res.status(500).send("Could not find the distance...");
    }
  }

  export async function checkHealth(req: Request, res: Response) {
    try {
      await AppBL.checkHealth();
      res.sendStatus(200)
    } catch (err) {
      res.status(500).send(err && err.message);
    }
  }

}
