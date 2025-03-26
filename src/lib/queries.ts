import {client} from './sanity';

// Get all blog posts
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "author": author->{
        name,
        role,
        "avatar": image.asset->url
      },
      "date": publishedAt,
      "category": categories[0]->title,
      mainImage,
      mainImageUrl,
      "tags": tags[]->title
    }
  `);
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string, preview = false) {
  const query = `
    *[_type == "post" && slug.current == $slug] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      body,
      "author": author->{
        name,
        role,
        "avatar": image.asset->url
      },
      publishedAt,
      "categories": categories[]->{
        title
      },
      mainImage,
      mainImageUrl,
      "tags": tags[]->{
        title
      }
    }[0]
  `;

  return client.fetch(query, { slug });
}

// Get featured posts
export async function getFeaturedPosts() {
  return client.fetch(`
    *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "author": author->{
        name,
        role,
        "avatar": image.asset->url
      },
      "date": publishedAt,
      "category": categories[0]->title,
      mainImage,
      mainImageUrl,
      "tags": tags[]->title
    }
  `);
}

// Get posts by category
export async function getPostsByCategory(category: string) {
  return client.fetch(`
    *[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "author": author->{
        name,
        role,
        "avatar": image.asset->url
      },
      "date": publishedAt,
      "category": categories[0]->title,
      mainImage,
      mainImageUrl,
      "tags": tags[]->title
    }
  `, { category });
}

// Get posts by tag
export async function getPostsByTag(tag: string) {
  return client.fetch(`
    *[_type == "post" && $tag in tags[]->title] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "author": author->{
        name,
        role,
        "avatar": image.asset->url
      },
      "date": publishedAt,
      "category": categories[0]->title,
      mainImage,
      mainImageUrl,
      "tags": tags[]->title
    }
  `, { tag });
}

// Get all categories
export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      description
    }
  `);
}

// Get all tags
export async function getAllTags() {
  return client.fetch(`
    *[_type == "tag"] | order(title asc) {
      _id,
      title
    }
  `);
}

// Get related posts based on tags
export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3) {
  return client.fetch(`
    *[_type == "post" && slug.current != $currentSlug && count((tags[]->title)[@ in $tags]) > 0] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "date": publishedAt,
      mainImage,
      mainImageUrl
    }
  `, { currentSlug, tags, limit });
}
