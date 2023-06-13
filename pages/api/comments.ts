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
  const { collection: commentsCollection } = await getConnection('comments');
  const { collection: usersCollection } = await getConnection('users');
  const { client, collection: requestCollection } = await getConnection(
    'product-requests'
  );

  if (!commentsCollection || !usersCollection || !requestCollection) {
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
    const results = await requestCollection.updateOne(
      {
        _id: new ObjectId(requestId),
      },
      { $push: { comments: addedComment.insertedId } }
    );

    if (!results) {
      throw new Error('Failed to update request with new comment');
    }

    client.close();
    res.status(200).json({ status: 'success', results });
  } catch (error) {
    client.close();
    res.status(204).json({ status: 'failed', error: error.message });
    return;
  }
};

export default handler;
