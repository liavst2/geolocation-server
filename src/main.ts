
import * as express from "express";
import * as http from "http";
import Config from "./config/config";
import { appRouter } from "./app";


export class AppServer {

  httpServer: http.Server;
  app: express.Application;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this._configureRoutes();
  }

  listen(port: number) {
    this.httpServer.listen(port);
  }

  close() {
    this.httpServer.close();
  }

  private _configureRoutes() {
    this.app.use( appRouter );
    // When no appropriate route found
    this.app.use((req: express.Request, res: express.Response) => {
      res.status(404).send({ msg: 'Unknown path: ' + req.path });
    });
  }

}

// setting up the server
const appServer = new AppServer();
appServer.listen(Config.HTTP_PORT);

// Upon killing the server
process.on("SIGTERM", () => {
  appServer.close();
  process.exit(0);
});
