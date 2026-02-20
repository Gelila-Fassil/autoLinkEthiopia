import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const approved = searchParams.get('approved')
    const pending = searchParams.get('pending')

    if (id) {
      const house = await prisma.house.findUnique({
        where: { id: parseInt(id) }
      })
      if (!house) {
        return NextResponse.json({ error: 'House not found' }, { status: 404 })
      }
      return NextResponse.json(house)
    }

    if (pending === 'true') {
      const houses = await prisma.house.findMany({
        where: { approved: false },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(houses)
    }

    const where = approved !== null ? { approved: approved === 'true' } : {}
    
    const houses = await prisma.house.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(houses)
  } catch (error) {
    console.error('Error fetching houses:', error)
    return NextResponse.json({ error: 'Failed to fetch houses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const house = await prisma.house.create({
      data: {
        name: body.name,
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        houseType: body.houseType,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        area: body.area,
        description: body.description,
        price: body.price,
        advertisementType: body.advertisementType,
        currency: body.currency,
        tags: body.tags,
        images: body.images || [],
        approved: false,
        category: 'house',
      }
    })

    return NextResponse.json(house, { status: 201 })
  } catch (error) {
    console.error('Error creating house:', error)
    return NextResponse.json({ error: 'Failed to create house' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'House ID required' }, { status: 400 })
    }

    const body = await request.json()
    
    const house = await prisma.house.update({
      where: { id: parseInt(id) },
      data: {
        approved: body.approved,
        ...(body.images && { images: body.images })
      }
    })

    return NextResponse.json(house)
  } catch (error) {
    console.error('Error updating house:', error)
    return NextResponse.json({ error: 'Failed to update house' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'House ID required' }, { status: 400 })
    }

    await prisma.house.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting house:', error)
    return NextResponse.json({ error: 'Failed to delete house' }, { status: 500 })
  }
}
