import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getConnection } from '../../data/db';

interface Data {
  status?: string;
  error?: string;
  results?: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { comment, requestId, userEmail } = req.body;
  const { client, feedbacksCollection, commentsCollection, usersCollection } =
    await getConnection();

  if (!commentsCollection || !usersCollection || !feedbacksCollection) {
    res
      .status(503)
      .json({ status: 'failed', error: 'Failed to connect to database' });

    client.close();
    return;
  }

  try {
    // GETTING USER ID
    const user = await usersCollection.findOne({ email: userEmail });
    const userId = user._id;

    if (!user) {
      throw new Error('Failed to fetch user data');
    }

    // ADD NEW COMMENT
    const newComment = {
      content: comment,
      user: new ObjectId(userId),
    };

    const addedComment = await commentsCollection.insertOne(newComment);

    if (!addedComment) {
      throw new Error('Failed to add comment');
    }

    // UPDATE REQUEST WITH NEW COMMENT
    const results = await feedbacksCollection.updateOne(
      {
        _id: new ObjectId(requestId),
      },
      { $push: { comments: addedComment.insertedId } }
    );

    if (!results) {
      throw new Error('Failed to update request with new comment');
    }

    res.status(200).json({ status: 'success', results });

    client.close();
    return;
  } catch (error) {
    res.status(204).json({ status: 'failed', error: error.message });

    client.close();
    return;
  }
};

export default handler;
