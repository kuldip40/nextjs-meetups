import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../helpers/api-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const { title, image, address, description } = req.body;

    const client = await connectToDatabase();

    const db = client.db();
    const meetupsCollection = db.collection(process.env.mongodb_collection);

    const result = await meetupsCollection.insertOne({
      title,
      image,
      address,
      description,
    });

    const allMeetups = await meetupsCollection.find().toArray();

    client.close();

    res.status(201).json({ message: allMeetups });
  }
}

export default handler;
