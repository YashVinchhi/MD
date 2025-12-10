import { NextRequest, NextResponse } from 'next/server';
import { llm } from '@/ai/llm';

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    const prediction = await llm('predict', content);
    return NextResponse.json({ prediction });
  } catch (error) {
    console.error('Error generating prediction:', error);
    return NextResponse.json({ error: 'Failed to generate prediction' }, { status: 500 });
  }
}
