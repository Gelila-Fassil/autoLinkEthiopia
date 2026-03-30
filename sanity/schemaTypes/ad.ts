import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ad',
  title: 'Ad',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['car', 'house'],
      },
      initialValue: 'car',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: ['ETB', 'USD', 'EUR', 'GBP'],
      },
      initialValue: 'ETB',
    }),
    defineField({
      name: 'advertisementType',
      title: 'Advertisement Type',
      type: 'string',
      options: {
        list: ['For Sale', 'For Rent'],
      },
      initialValue: 'For Sale',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['PENDING', 'APPROVED', 'REJECTED'],
      },
      initialValue: 'PENDING',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'receipt',
      title: 'Payment Receipt',
      type: 'image',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage',
      type: 'string',
    }),
    defineField({
      name: 'speed',
      title: 'Speed',
      type: 'string',
    }),
    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: ['Automatic', 'Manual'],
      },
    }),
    defineField({
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      },
    }),
    defineField({
      name: 'bodyType',
      title: 'Body Type',
      type: 'string',
      options: {
        list: ['SUV', 'Sedan', 'Truck', 'Hatchback', 'Minivan'],
      },
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
    }),
    defineField({
      name: 'engine',
      title: 'Engine',
      type: 'string',
    }),
    defineField({
      name: 'maintenance',
      title: 'Maintenance',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'string',
    }),
    defineField({
      name: 'houseType',
      title: 'House Type',
      type: 'string',
      options: {
        list: ['Apartment', 'Villa', 'Guest House', 'Office'],
      },
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'string',
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'string',
    }),
    defineField({
      name: 'area',
      title: 'Area (sqm)',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
})
