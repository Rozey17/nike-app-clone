export default {
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(80),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      options: {
        maxLength: 500,
      },
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    },
    {
      name: 'category',
      title: ' Category',
      type: 'reference',
      weak: true,
      to: [{type: 'category'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sub_category',
      title: 'SubCategory',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'size',
      title: ' Size',
      type: 'reference',
      weak: true,
      to: [{type: 'size'}],
    },
    {
      name: 'gender',
      title: ' Gender',
      type: 'reference',
      weak: true,
      to: [{type: 'gender'}],
    },

    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
}
