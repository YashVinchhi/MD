import { NextApiRequest, NextApiResponse } from 'next';
import { getPrediction } from '@/lib/llmService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content } = req.body;
    try {
      const prediction = await getPrediction(content);
      res.status(200).json({ prediction });
    } catch (error) {
      console.error('Error generating prediction:', error);
      res.status(500).json({ error: 'Failed to generate prediction' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}