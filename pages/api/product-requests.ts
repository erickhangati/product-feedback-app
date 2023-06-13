import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getConnection } from '../../data/db';

interface Data {
  status: string;
  error?: string;
  results?: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id, status, title, description, category, user, isDeleting } =
    req.body;
  const { client, collection: feedbacksCollection } = await getConnection(
    'product-requests'
  );

  if (!feedbacksCollection) {
    client.close();
    res
      .status(503)
      .json({ status: 'failed', error: 'Failed to connect to database' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const results = await feedbacksCollection
        .aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
          {
            $lookup: {
              from: 'comments',
              let: { commentIds: { $ifNull: ['$comments', []] } },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ['$_id', '$$commentIds'],
                    },
                  },
                },
                {
                  $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                  },
                },
                {
                  $unwind: '$user',
                },
                {
                  $lookup: {
                    from: 'replies',
                    let: { replyIds: { $ifNull: ['$replies', []] } },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $in: ['$_id', '$$replyIds'],
                          },
                        },
                      },
                      {
                        $lookup: {
                          from: 'users',
                          localField: 'user',
                          foreignField: '_id',
                          as: 'user',
                        },
                      },
                      {
                        $unwind: '$user',
                      },
                      {
                        $lookup: {
                          from: 'users',
                          localField: 'replyingTo',
                          foreignField: '_id',
                          as: 'replyToUser',
                        },
                      },
                      {
                        $unwind: '$replyToUser',
                      },
                      {
                        $project: {
                          'user.email': 0,
                          'user.password': 0,
                          'replyToUser.email': 0,
                          'replyToUser.password': 0,
                        },
                      },
                      {
                        $group: {
                          _id: '$_id',
                          content: { $first: '$content' },
                          user: { $first: '$user' },
                          replyingTo: { $first: '$replyToUser' },
                        },
                      },
                    ],
                    as: 'replies',
                  },
                },
                {
                  $project: {
                    'user.email': 0,
                    'user.password': 0,
                  },
                },
                {
                  $group: {
                    _id: '$_id',
                    content: { $first: '$content' },
                    user: { $first: '$user' },
                    replies: { $first: '$replies' },
                  },
                },
              ],
              as: 'comments',
            },
          },
          {
            $project: {
              'user.email': 0,
              'user.password': 0,
            },
          },
        ])
        .toArray();

      if (!results) {
        throw new Error('Failed to fetch data');
      }

      client.close();
      res.status(200).json({ status: 'success', results });
      return;
    } catch (error) {
      client.close();
      res.status(204).json({ status: 'failed', error: error.message });
      return;
    }
  }

  if (req.method === 'POST') {
    try {
      const results = await feedbacksCollection.insertOne({
        title,
        description,
        category,
        status,
        user: new ObjectId(user),
      });

      if (!results) {
        throw new Error('Failed to fetch data');
      }

      client.close();
      res.status(200).json({ status: 'success', results });
      return;
    } catch (error) {
      client.close();
      res.status(204).json({ status: 'failed', error: error.message });
      return;
    }
  }

  if (req.method === 'PATCH') {
    try {
      // UPDATE FEEDBACK
      if (!isDeleting) {
        const results = await feedbacksCollection.findOneAndUpdate(
          {
            _id: new ObjectId(_id),
          },
          { $set: { title, description, category, status } }
        );

        if (!results) {
          throw new Error('Failed to update feedback');
        }

        client.close();
        res.status(200).json({ status: 'success', results });
        return;
      }

      // DELETE FEEDBACK
      const results = await feedbacksCollection.findOneAndDelete({
        _id: new ObjectId(_id),
      });

      if (!results) {
        throw new Error('Failed to delete feedback');
      }

      client.close();
      res.status(200).json({ status: 'success', results });
      return;
    } catch (error) {
      client.close();
      res.status(204).json({ status: 'failed', error: error.message });
      return;
    }
  }

  res.status(200).json({ status: 'no reuest method' });
};

export default handler;
