
import { MongoClient } from "mongodb";

class AppData {

  db: MongoClient

  constructor() {
    const url = require('./db.json')["mongo"]["url"];
    this.db = new MongoClient(url, { useNewUrlParser: true });
    this.db.connect();
  }

  async getDistanceDoc(source: string, destination: string) {
    const collection = this.db.db("geolocation").collection("distances");
    // Fetching distance between source and destination is a commutative operation 
    const doc = await collection.findOne({
      $or: [
        { $and: [{ source: source }, { destination: destination }] },
        { $and: [{ source: destination }, { destination: source }] }
      ]
    });
    return doc;
  }

  async setDistance(source: string, destination: string, distance: number) {
    const collection = this.db.db("geolocation").collection("distances");
    await collection.insertOne({ source, destination, distance, hits: 1 });
    return true;
  }

  async hit(_id: string) {
    const collection = this.db.db("geolocation").collection("distances");
    await collection.updateOne({ _id }, { $inc: { hits: 1 } });
    return true;
  }

  async getPopular() {
    const collection = this.db.db("geolocation").collection("distances");
    const mostPopulat = await collection.find({}).sort({ "hits": -1 }).limit(1).toArray();
    return mostPopulat && mostPopulat[0];
  }

  checkAlive() {
    return this.db.isConnected();
  }

}

export const appData = new AppData();
