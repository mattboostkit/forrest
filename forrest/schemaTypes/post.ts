export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the blog post',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required()
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title used for search engines and browser tabs',
          validation: Rule => Rule.max(60).warning('Should be under 60 characters')
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines',
          validation: Rule => Rule.max(160).warning('Should be under 160 characters')
        },
        {
          name: 'shareImage',
          title: 'Share Image',
          type: 'image',
          description: 'Image used for social media sharing (Facebook, Twitter, etc.)',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
