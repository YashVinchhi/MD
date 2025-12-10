import { NextRequest, NextResponse } from 'next/server';
import { llm } from '@/ai/llm';

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    const summary = await llm('summarize', content);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
