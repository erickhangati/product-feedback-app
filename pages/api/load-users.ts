import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { getConnection } from '../../data/db';

interface Data {
  success: string;
  results?: any;
  data?: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const { client, collection: usersCollection } = await getConnection(
      'users'
    );
    const results = await usersCollection.find({}).toArray();
    const data = {
      users: results,
    };

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(filePath, jsonData);

    client.close();
    res.status(200).json({ success: 'success', data });
    return;
  }

  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const jsonData = fs.readFileSync(filePath);
    const { users } = JSON.parse(jsonData.toString());

    const { client, collection: usersCollection } = await getConnection(
      'users'
    );

    const results = await usersCollection.insertMany(users);
    client.close();

    res.status(200).json({ success: 'success', results });
    return;
  }

  res.status(200).json({ success: 'no request method' });
};

export default handler;
