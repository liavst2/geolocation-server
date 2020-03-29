
import axios from "axios";
import { Geometry } from "../tools/geometry";

/**
 * The application business logic
 */
class ExternalGeoLocator {

  readonly URL = "https://geocode.xyz";
  readonly optQuery = "json=1";

  async getDistance(source: string, destination: string) {
    try {
      const { data: d1 } = await axios(`${this.URL}/${source}?${this.optQuery}`);
      const { data: d2 } = await axios(`${this.URL}/${destination}?${this.optQuery}`);
      if (!d1 || !d2) {
        throw new Error("Invalid source or destination!");
      }
      return Geometry.calculateDistance(d1.latt, d1.longt, d2.latt, d2.longt);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}

export const externalGeoLocator = new ExternalGeoLocator();
