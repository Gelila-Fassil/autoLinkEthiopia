import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const approved = searchParams.get('approved')
    const pending = searchParams.get('pending')

    if (id) {
      const car = await prisma.car.findUnique({
        where: { id: parseInt(id) }
      })
      if (!car) {
        return NextResponse.json({ error: 'Car not found' }, { status: 404 })
      }
      return NextResponse.json(car)
    }

    if (pending === 'true') {
      const cars = await prisma.car.findMany({
        where: { approved: false },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(cars)
    }

    const where = approved !== null ? { approved: approved === 'true' } : {}
    
    const cars = await prisma.car.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const car = await prisma.car.create({
      data: {
        name: body.name,
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        year: body.year,
        mileage: body.mileage,
        speed: body.speed,
        transmission: body.transmission,
        fuelType: body.fuelType,
        bodyType: body.bodyType,
        description: body.description,
        price: body.price,
        condition: body.condition,
        engine: body.engine,
        maintenance: body.maintenance,
        advertisementType: body.advertisementType,
        currency: body.currency,
        tags: body.tags,
        images: body.images || [],
        approved: false,
        category: 'car',
      }
    })

    return NextResponse.json(car, { status: 201 })
  } catch (error) {
    console.error('Error creating car:', error)
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Car ID required' }, { status: 400 })
    }

    const body = await request.json()
    
    const car = await prisma.car.update({
      where: { id: parseInt(id) },
      data: {
        approved: body.approved,
        ...(body.images && { images: body.images })
      }
    })

    return NextResponse.json(car)
  } catch (error) {
    console.error('Error updating car:', error)
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Car ID required' }, { status: 400 })
    }

    await prisma.car.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting car:', error)
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 })
  }
}
