import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const approved = searchParams.get('approved')
    const pending = searchParams.get('pending')
    const category = searchParams.get('category')
    const premium = searchParams.get('premium')

    const { db } = await connectToDatabase()
    const collection = db.collection('ads')

    if (id) {
      const ad = await collection.findOne({ _id: new ObjectId(id) })
      if (!ad) {
        return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
      }
      return NextResponse.json({ ...ad, _id: ad._id.toString() })
    }

    const filter: Record<string, unknown> = {}
    if (pending === 'true') {
      filter.status = 'PENDING'
      if (category) filter.category = category
    } else if (approved === 'true') {
      filter.status = 'APPROVED'
      if (category) filter.category = category
      if (premium === 'true') filter.premium = true
      else if (premium === 'false') filter.premium = { $ne: true }
    }

    const ads = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(ads.map(a => ({ ...a, _id: a._id.toString() })))
  } catch (error) {
    console.error('Error fetching ads:', error)
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()
    const collection = db.collection('ads')

    const doc = {
      name: body.name,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      category: body.category || 'car',
      description: body.description,
      price: body.price,
      currency: body.currency || 'ETB',
      advertisementType: body.advertisementType || 'For Sale',
      premium: body.premium === true,
      status: 'PENDING',
      images: body.images || [],
      receipt: body.receipt || '',
      year: body.year || '',
      mileage: body.mileage || '',
      speed: body.speed || '',
      transmission: body.transmission || '',
      fuelType: body.fuelType || '',
      bodyType: body.bodyType || '',
      condition: body.condition || '',
      engine: body.engine || '',
      maintenance: body.maintenance || '',
      tags: body.tags || '',
      houseType: body.houseType || '',
      bedrooms: body.bedrooms || '',
      bathrooms: body.bathrooms || '',
      area: body.area || '',
      createdAt: new Date().toISOString(),
    }

    const result = await collection.insertOne(doc)
    return NextResponse.json({ ...doc, _id: result.insertedId.toString() }, { status: 201 })
  } catch (error) {
    console.error('Error creating ad:', error)
    const message = error instanceof Error ? error.message : 'Failed to create ad'
    return NextResponse.json({ error: message }, { status: 500 })
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
    const { db } = await connectToDatabase()
    const collection = db.collection('ads')

    const update: Record<string, unknown> = {}
    if (body.approved !== undefined) {
      update.status = body.approved ? 'APPROVED' : 'REJECTED'
    } else if (body.status) {
      update.status = body.status
    }
    if (body.premium !== undefined) {
      update.premium = body.premium === true
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
    }

    return NextResponse.json({ ...result, _id: result._id.toString() })
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

    const { db } = await connectToDatabase()
    const collection = db.collection('ads')

    await collection.deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting ad:', error)
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 })
  }
}
