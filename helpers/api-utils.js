import { MongoClient, ObjectId } from "mongodb";

export async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.quxdjty.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);

  return client;
}

export async function getAllMeetups() {
  const client = await connectToDatabase();

  const db = client.db();

  const meetupsCollection = db.collection(process.env.mongodb_collection);

  const allMeetups = await meetupsCollection.find().toArray();

  const meetups = allMeetups.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
  }));

  client.close();

  return meetups;
}

export async function getMeetupData(meetupId) {
  const client = await connectToDatabase();

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  const meetupData = {
    id: selectedMeetup._id.toString(),
    title: selectedMeetup.title,
    image: selectedMeetup.image,
    address: selectedMeetup.address,
    description: selectedMeetup.description,
  };

  return JSON.parse(JSON.stringify(meetupData));
}
