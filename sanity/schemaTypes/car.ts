import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'car',
  title: 'Car',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
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
      name: 'bodyType',
      title: 'Body Type',
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
      initialValue: 'Automatic',
    }),
    defineField({
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
    }),
    defineField({
      name: 'engine',
      title: 'Engine',
      type: 'string',
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'advertisementType',
      title: 'Advertisement Type',
      type: 'string',
      options: {
        list: ['For Sale', 'For Rent'],
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'owner',
      title: 'Owner/Seller Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category (Hypercar, Supercar, Track Weapon)',
      type: 'string',
    }),
  ],
})
