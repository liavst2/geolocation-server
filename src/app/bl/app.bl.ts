
import { appData } from "../data/app.data";
import { externalGeoLocator } from "./external-geolocator.bl";

/**
 * The application business logic
 */
export class AppBL {

  static async getDistance(source: string, destination: string) {
    let distance = await appData.getDistance(source, destination);
    if (distance) { // the document does not exists in DB
      return distance;
    }
    distance = await externalGeoLocator.getDistance(source, destination);
    await appData.setDistance(source, destination, distance);
    return distance;
  }

  static async checkHealth() {
    const isDBAlive = appData.checkAlive();
    if (!isDBAlive) {
      throw new Error("Database lost connection!");
    }
    return true;
  }

}