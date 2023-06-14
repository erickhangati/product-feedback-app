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
    const { client, feedbacksCollection } = await getConnection();
    const results = await feedbacksCollection.find({}).toArray();
    const data = {
      productRequests: results,
    };

    const filePath = path.join(process.cwd(), 'data', 'product-requests.json');
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(filePath, jsonData);

    client.close();
    res.status(200).json({ success: 'success', data });
    return;
  }

  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'product-requests.json');
    const jsonData = fs.readFileSync(filePath);
    const { productRequests } = JSON.parse(jsonData.toString());

    const data = productRequests.map((request: any) => {
      const commentIds = request.comments?.map(
        (comment: any) => new ObjectId(comment)
      );

      if (commentIds) {
        return {
          ...request,
          _id: new ObjectId(request._id),
          user: new ObjectId(request.user),
          comments: commentIds,
        };
      }

      return {
        ...request,
        _id: new ObjectId(request._id),
        user: new ObjectId(request.user),
      };
    });

    const { client, feedbacksCollection } = await getConnection();

    const results = await feedbacksCollection.insertMany(data);
    // const results = await productRequestsCollection.deleteMany();
    client.close();

    res.status(200).json({ success: 'success', results });
    return;
  }

  res.status(200).json({ success: 'no request method' });
};

export default handler;
