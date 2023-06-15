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
  const { client, feedbacksCollection, commentsCollection, repliesCollection } =
    await getConnection();

  if (!feedbacksCollection) {
    res
      .status(503)
      .json({ status: 'failed', error: 'Failed to connect to database' });

    client.close();
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

      res.status(200).json({ status: 'success', results });

      client.close();
      return;
    } catch (error) {
      res.status(204).json({ status: 'failed', error: error.message });

      client.close();
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

      res.status(200).json({ status: 'success', results });

      client.close();
      return;
    } catch (error) {
      res.status(204).json({ status: 'failed', error: error.message });

      client.close();
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

        res.status(200).json({ status: 'success', results });

        client.close();
        return;
      }

      // Aggregation pipeline to retrieve product request, comments, and replies
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(_id),
          },
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
      ];

      const [productRequest] = await feedbacksCollection
        .aggregate(pipeline)
        .toArray();

      const commentIds = productRequest?.comments.map((comment) => comment._id);
      const replies = productRequest?.comments.flatMap((commentId) => {
        const comment = productRequest.comments.find(
          (item) => item._id === commentId._id
        );
        return comment.replies || [];
      });

      const replyIds = replies?.map((reply) => reply._id);

      let results;

      // // DELETE FEEDBACK
      results = await feedbacksCollection.deleteOne({
        _id: new ObjectId(_id),
      });

      if (commentIds) {
        // DELETE COMMENTS
        results = await commentsCollection.deleteMany({
          _id: {
            $in: commentIds.map((id: string) => new ObjectId(id)),
          },
        });
      }

      if (replyIds) {
        // DELETE REPLIES
        results = await repliesCollection.deleteMany({
          _id: {
            $in: replyIds.map((id: string) => new ObjectId(id)),
          },
        });
      }

      if (!results) {
        throw new Error('Failed to delete feedback');
      }

      res.status(200).json({ status: 'success', results });
      client.close();
      return;
    } catch (error) {
      res.status(204).json({ status: 'failed' });

      client.close();
      return;
    }
  }

  res.status(200).json({ status: 'no reuest method' });
};

export default handler;
