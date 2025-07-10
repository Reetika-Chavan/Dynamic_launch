import { NextResponse } from 'next/server'
import { Stack } from '@/lib/contentstack'

export async function GET() {
  try {
    const Query = Stack.ContentType('drivers').Query()
    const response = await Query.toJSON().find()
    const entries = response?.[0] || []

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Drivers API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 })
  }
}
