import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getConnection } from '../../data/db';

interface Data {
  status?: string;
  error?: string;
  results?: any;
  replyingToUser?: any;
  addedReplyId?: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') return;

  const { content, replyingTo, userEmail, commentId } = req.body;

  const { client, collection: usersCollection } = await getConnection('users');
  const { collection: repliesCollection } = await getConnection('replies');
  const { collection: commentsCollection } = await getConnection('comments');

  if (!commentsCollection || !usersCollection || !repliesCollection) {
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

    // GETTING REPLYINGTO USER ID
    const replyingToUser = await usersCollection.findOne({
      _id: new ObjectId(replyingTo),
    });

    // ADD NEW REPLY
    const newReply = {
      content,
      user: new ObjectId(userId),
      replyingTo: new ObjectId(replyingTo),
    };

    const addedReply = await repliesCollection.insertOne(newReply);
    const addedReplyId = addedReply.insertedId;

    if (!addedReply) {
      throw new Error('Failed to add reply');
    }

    // UPDATE COMMENTS WITH NEW REPLY
    const results = await commentsCollection.updateOne(
      {
        _id: new ObjectId(commentId),
      },
      { $push: { replies: addedReply.insertedId } }
    );

    if (!results) {
      throw new Error('Failed to update comments with new reply');
    }

    res
      .status(200)
      .json({ status: 'success', results, replyingToUser, addedReplyId });

    client.close();
    return;
  } catch (error) {
    res.status(204).json({ status: 'failed', error: error.message });

    client.close();
    return;
  }
};

export default handler;
