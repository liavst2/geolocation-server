
import { Request, Response } from "express";

export namespace AppCtrl {

  export function helloResponse(req: Request, res: Response) {
    res.sendStatus(200);
  }

}
