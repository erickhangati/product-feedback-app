import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Data = {
  status: string;
  data?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'data', 'data.json');
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData.toString());

    res.status(200).json({ status: 'success', data });
    return;
  }

  res.status(200).json({ status: 'success' });
};

export default handler;
