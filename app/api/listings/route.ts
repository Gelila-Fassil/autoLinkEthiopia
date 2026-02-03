import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'listings.json')

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(DATA_FILE)
  } catch (err) {
    await fs.writeFile(DATA_FILE, '[]')
  }
}

export async function GET() {
  await ensureDataFile()
  const content = await fs.readFile(DATA_FILE, 'utf-8')
  const listings = JSON.parse(content || '[]')
  return NextResponse.json({ listings })
}

export async function POST(req: Request) {
  let body: any
  try {
    body = await req.json()
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const errors: string[] = []
  const requiredBase = ['firstName', 'lastName', 'email', 'phone', 'listingType']
  for (const f of requiredBase) {
    if (!body[f]) errors.push(`${f} is required`)
  }

  if (body.listingType === 'car') {
    const requiredCar = ['makeModel', 'year', 'price']
    for (const f of requiredCar) {
      if (!body[f]) errors.push(`${f} is required for car listings`)
    }
  } else if (body.listingType === 'home') {
    const requiredHome = ['title', 'propertyType', 'rent', 'address']
    for (const f of requiredHome) {
      if (!body[f]) errors.push(`${f} is required for home listings`)
    }
  } else {
    errors.push('Invalid listingType')
  }

  if (errors.length) return NextResponse.json({ errors }, { status: 400 })

  await ensureDataFile()
  const content = await fs.readFile(DATA_FILE, 'utf-8')
  const listings = JSON.parse(content || '[]')

  const newListing = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...body,
  }

  listings.push(newListing)
  await fs.writeFile(DATA_FILE, JSON.stringify(listings, null, 2))

  return NextResponse.json({ listing: newListing }, { status: 201 })
}
