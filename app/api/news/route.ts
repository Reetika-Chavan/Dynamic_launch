import { NextResponse } from 'next/server';
import { Stack } from '@/lib/contentstack';

export async function GET() {
  try {
    const Query = Stack.ContentType('news').Query();
    const response = await Query.toJSON().find();

    const entries = response?.[0]?.map((entry: any) => ({
      title: entry.title,
      summary: entry.summary,
      date: entry.date,
      image: entry.image?.url || '', 
    })) || [];

    return NextResponse.json(entries);
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
