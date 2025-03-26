export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'}
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'}
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              }
            ]
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'post' }
                ]
              }
            ]
          }
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            isHighlighted: true
          }
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true
          }
        }
      ]
    },
    {
      type: 'code',
      name: 'code',
      title: 'Code Block',
      options: {
        withFilename: true,
      }
    },
    {
      name: 'callout',
      title: 'Callout',
      type: 'object',
      fields: [
        {
          name: 'tone',
          title: 'Tone',
          type: 'string',
          options: {
            list: [
              { title: 'Default', value: 'default' },
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' }
            ],
            layout: 'radio',
            direction: 'horizontal'
          },
          initialValue: 'default'
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' }
                ],
                annotations: []
              }
            }
          ]
        }
      ],
      preview: {
        select: {
          tone: 'tone',
          content: 'content'
        },
        prepare({ tone, content }) {
          const block = (content || []).find(block => block._type === 'block')
          const firstLine = block?.children
            ?.filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
            .substring(0, 50)
          
          return {
            title: `Callout (${tone || 'default'})`,
            subtitle: firstLine ? `${firstLine}...` : 'Empty callout'
          }
        }
      }
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'object',
      fields: [
        {
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Important for SEO and accessibility.'
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption'
                }
              ]
            }
          ],
          validation: Rule => Rule.min(2).error('A gallery needs at least 2 images')
        },
        {
          name: 'caption',
          title: 'Gallery Caption',
          type: 'string'
        },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Grid', value: 'grid' },
              { title: 'Carousel', value: 'carousel' }
            ],
            layout: 'radio',
            direction: 'horizontal'
          },
          initialValue: 'grid'
        }
      ],
      preview: {
        select: {
          images: 'images',
          caption: 'caption'
        },
        prepare({ images, caption }) {
          return {
            title: caption || 'Image Gallery',
            subtitle: `${images?.length || 0} image${images?.length !== 1 ? 's' : ''}`,
            media: images?.[0]
          }
        }
      }
    }
  ]
}
