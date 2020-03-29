
import { MongoClient } from "mongodb";

class AppData {

  db: MongoClient

  constructor() {
    const url = require('./db.json')["mongo"]["url"];
    this.db = new MongoClient(url, { useNewUrlParser: true });
    this.db.connect();
  }

  async getDistance(source: string, destination: string) {
    const collection = this.db.db("geolocation").collection("distances");
    // Fetching destination between source and destination is a commutative operation 
    const doc = await collection.findOne({
      $or: [
        { $and: [{ source: source }, { destination: destination }] },
        { $and: [{ source: destination }, { destination: source }] }
      ]
    });
    return doc && doc.distance;
  }

  async setDistance(source: string, destination: string, distance: number) {
    const collection = this.db.db("geolocation").collection("distances");
    await collection.insertOne({ source, destination, distance });
    return true;
  }

  checkAlive() {
    return this.db.isConnected();
  }

}

export const appData = new AppData();
