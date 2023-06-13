import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';
import { getConnection } from '../../data/db';

interface Data {
  success: string;
  results?: any;
  data?: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const { client, collection: commentsCollection } = await getConnection(
      'comments'
    );
    const results = await commentsCollection.find({}).toArray();
    const data = {
      comments: results,
    };

    const filePath = path.join(process.cwd(), 'data', 'comments.json');
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(filePath, jsonData);

    client.close();
    res.status(200).json({ success: 'success', data });
    return;
  }

  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'comments.json');
    const jsonData = fs.readFileSync(filePath);
    const { comments } = JSON.parse(jsonData.toString());
    const data = comments.map((comment: any) => {
      const repliesIds = comment.replies?.map(
        (reply: any) => new ObjectId(reply)
      );

      if (repliesIds) {
        return {
          ...comment,
          _id: new ObjectId(comment._id),
          user: new ObjectId(comment.user),
          replies: repliesIds,
        };
      }

      return {
        ...comment,
        _id: new ObjectId(comment._id),
        user: new ObjectId(comment.user),
      };
    });

    const { client, collection: commentsCollection } = await getConnection(
      'comments'
    );

    // const results = await commentsCollection.deleteMany();
    const results = await commentsCollection.insertMany(data);
    client.close();

    res.status(200).json({ success: 'success', results });
    return;
  }

  res.status(200).json({ success: 'no request method' });
};

export default handler;
