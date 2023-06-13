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
    const { client, collection: repliesCollection } = await getConnection(
      'replies'
    );
    const results = await repliesCollection.find({}).toArray();
    const data = {
      replies: results,
    };

    const filePath = path.join(process.cwd(), 'data', 'replies.json');
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(filePath, jsonData);

    client.close();
    res.status(200).json({ success: 'success', data });
    return;
  }

  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'replies.json');
    const jsonData = fs.readFileSync(filePath);
    const { replies } = JSON.parse(jsonData.toString());
    const data = replies.map((reply: any) => ({
      ...reply,
      replyingTo: new ObjectId(reply.replyingTo),
      user: new ObjectId(reply.user),
    }));

    const { client, collection: repliesCollection } = await getConnection(
      'replies'
    );

    // const results = await repliesCollection.deleteMany();
    const results = await repliesCollection.insertMany(data);
    client.close();

    res.status(200).json({ success: 'success', results });
    return;
  }

  res.status(200).json({ success: 'no request method' });
};

export default handler;
