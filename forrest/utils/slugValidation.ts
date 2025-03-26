// forrest/utils/slugValidation.ts
export const slugValidation = (Rule: any) => 
  Rule.required().custom((slug: any) => {
    if (!slug || !slug.current) {
      return 'Slug is required'
    }
    if (slug.current.includes(' ')) {
      return 'Slug cannot contain spaces'
    }
    return true
  })