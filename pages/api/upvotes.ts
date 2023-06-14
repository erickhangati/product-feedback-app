import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getConnection } from '../../data/db';

interface Data {
  status?: string;
  error?: string;
  results?: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'PATCH') return;

  const { _id, upvotes } = req.body;
  const { client, collection: feedbacksCollection } = await getConnection(
    'product-requests'
  );

  if (!feedbacksCollection) {
    res
      .status(503)
      .json({ status: 'failed', error: 'Failed to connect to database' });

    client.close();
    return;
  }

  try {
    const results = await feedbacksCollection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: { upvotes },
      }
    );

    if (!results) {
      throw new Error('Failed to update comments with new reply');
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
