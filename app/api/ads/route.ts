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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const approved = searchParams.get('approved')
    const pending = searchParams.get('pending')
    const category = searchParams.get('category')

    if (id) {
      const ad = await client.fetch(`*[_type == "ad" && _id == $id][0]`, { id })
      if (!ad) {
        return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
      }
      return NextResponse.json(ad)
    }

    let filter = ''
    const params: Record<string, string> = {}

    if (pending === 'true') {
      filter = `_type == "ad" && status == "PENDING"`
    } else if (approved === 'true') {
      filter = `_type == "ad" && status == "APPROVED"`
      if (category) {
        filter += ` && category == $category`
        params.category = category
      }
    } else {
      filter = `_type == "ad"`
    }

    const ads = await client.fetch(
      `*${filter} | order(createdAt desc)`,
      params
    )

    return NextResponse.json(ads)
  } catch (error) {
    console.error('Error fetching ads:', error)
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const ad = await client.create({
      _type: 'ad',
      name: body.name,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      category: body.category || 'car',
      description: body.description,
      price: body.price,
      currency: body.currency || 'ETB',
      advertisementType: body.advertisementType || 'For Sale',
      status: 'PENDING',
      images: body.images || [],
      year: body.year,
      mileage: body.mileage,
      speed: body.speed,
      transmission: body.transmission,
      fuelType: body.fuelType,
      bodyType: body.bodyType,
      condition: body.condition,
      engine: body.engine,
      maintenance: body.maintenance,
      tags: body.tags,
      houseType: body.houseType,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      area: body.area,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json(ad, { status: 201 })
  } catch (error) {
    console.error('Error creating ad:', error)
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Ad ID required' }, { status: 400 })
    }

    const body = await request.json()

    const ad = await client.patch(id).set({
      ...(body.status && { status: body.status }),
      ...(body.approved !== undefined && { status: body.approved ? 'APPROVED' : 'REJECTED' }),
    }).commit()

    return NextResponse.json(ad)
  } catch (error) {
    console.error('Error updating ad:', error)
    return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Ad ID required' }, { status: 400 })
    }

    await client.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting ad:', error)
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 })
  }
}
