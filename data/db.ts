import { MongoClient } from 'mongodb';

export const getConnection = async () => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.ldtv9dk.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    );

    const db = client.db();
    const feedbacksCollection = db.collection('product-requests');
    const commentsCollection = db.collection('comments');
    const repliesCollection = db.collection('replies');
    const usersCollection = db.collection('users');

    return {
      client,
      feedbacksCollection,
      commentsCollection,
      repliesCollection,
      usersCollection,
    };
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
