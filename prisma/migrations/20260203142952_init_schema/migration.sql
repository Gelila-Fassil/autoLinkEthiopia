-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "advertisementType" TEXT NOT NULL,
    "year" TEXT,
    "mileage" TEXT,
    "transmission" TEXT,
    "fuelType" TEXT,
    "bedrooms" TEXT,
    "bathrooms" TEXT,
    "area" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);
