import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

export async function POST() {
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Missing Cloudinary config' }, { status: 500 })
  }

  const timestamp = Math.round(Date.now() / 1000)
  const folder = 'autolink'

  const params = `folder=${folder}&timestamp=${timestamp}`
  const signature = createHash('sha1').update(params + apiSecret).digest('hex')

  return NextResponse.json({
    cloudName,
    apiKey,
    signature,
    timestamp,
    folder,
  })
}
