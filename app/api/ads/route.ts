import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure you created this in Step 5 of our guide

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // This creates a new row in your PostgreSQL "Ad" table
    const newAd = await prisma.ad.create({
      data: {
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        category: body.activeTab, // This tells us if it's a 'car' or 'house'
        name: body.name,
        description: body.description,
        price: body.price,
        currency: body.currency,
        advertisementType: body.advertisementType,
        
        // Car specific fields (maps to schema)
        year: body.year || null,
        mileage: body.mileage || null,
        transmission: body.transmission || null,
        fuelType: body.fuelType || null,
        
        // House specific fields (maps to schema)
        bedrooms: body.bedrooms || null,
        bathrooms: body.bathrooms || null,
        area: body.area || null,

        status: "PENDING", // Default status for admin review
      },
    });

    return NextResponse.json({ message: "Listing saved!", id: newAd.id }, { status: 201 });
  } catch (error) {
    console.error("Prisma Error:", error);
    return NextResponse.json({ error: "Failed to store data" }, { status: 500 });
  }
}