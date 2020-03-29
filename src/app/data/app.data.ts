
import { MongoClient } from "mongodb";

class AppData {

  db: MongoClient

  constructor() {
    const url = require('./db.json')["mongo"]["url"];
    this.db = new MongoClient(url);
    this.db.connect();
  }

  async getDistance(source: string, destination: string) {
    const collection = this.db.db("geolocation").collection("distances");
    const doc = await collection.findOne({ source, destination });
    return doc && doc.distance;
  }

  async setDistance(source: string, destination: string, distance: number) {
    const collection = this.db.db("geolocation").collection("distances");
    await collection.insertOne({ source, destination, distance });
    return true;
  }

}

export const appData = new AppData();
