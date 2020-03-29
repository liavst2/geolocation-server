
import { appData } from "../data/app.data";
import { externalGeoLocator } from "./external-geolocator.bl";

/**
 * The application business logic
 */
export class AppBL {

  static async getDistance(source: string, destination: string) {
    let doc = await appData.getDistanceDoc(source, destination);
    if (doc && doc.distance) { 
      // the document exists in DB, increment its hits
      await appData.hit(doc._id);
      return doc.distance;
    }
    let distance = await externalGeoLocator.getDistance(source, destination);
    await appData.setDistance(source, destination, distance);
    return distance;
  }

  static async getPopular() {
    return appData.getPopular();
  }

  static async checkHealth() {
    const isDBAlive = appData.checkAlive();
    if (!isDBAlive) {
      throw new Error("Database lost connection!");
    }
    return true;
  }

}