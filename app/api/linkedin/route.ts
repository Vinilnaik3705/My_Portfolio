import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const getFilePath = () => path.join(process.cwd(), 'data', 'linkedin.json')

export async function GET() {
  try {
    const filePath = getFilePath()
    const fileContent = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading LinkedIn data:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Basic API key validation
    const authHeader = request.headers.get('x-api-key')
    const expectedKey = process.env.LINKEDIN_WEBHOOK_KEY || 'default-secret-key'

    if (!authHeader || authHeader !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const filePath = getFilePath()

    // Validate body structure briefly
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Read current data first to allow partial updates
    let currentData = {}
    try {
      const fileContent = await fs.readFile(filePath, 'utf8')
      currentData = JSON.parse(fileContent)
    } catch (e) {
      // If file doesn't exist yet, we'll create it
    }

    // Merge incoming changes
    const updatedData = {
      ...currentData,
      ...body,
      // If nested objects are updated, merge them as well
      stats: body.stats ? { ...(currentData as any).stats, ...body.stats } : (currentData as any).stats,
      certifications: body.certifications || (currentData as any).certifications,
      education: body.education || (currentData as any).education,
      posts: body.posts || (currentData as any).posts,
    }

    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8')

    return NextResponse.json({ success: true, data: updatedData })
  } catch (error) {
    console.error('Error updating LinkedIn data:', error)
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 })
  }
}
