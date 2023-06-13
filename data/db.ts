import { MongoClient } from 'mongodb';

export const getConnection = async (theCollection: string) => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.ldtv9dk.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  );

  const db = client.db();
  const collection = db.collection(theCollection);

  return {
    client,
    collection,
  };
};
