import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../../../sanity/env'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image, type } = body

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    const ext = image.match(/^data:image\/(\w+);base64,/)?.[1] || 'jpg'
    const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`

    const asset = await client.assets.upload('image', buffer, {
      filename: `${type}_${Date.now()}.${ext}`,
      contentType: mimeType,
    })

    return NextResponse.json({ 
      url: asset.url,
      asset: {
        _type: 'reference',
        _ref: asset._id,
      }
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
