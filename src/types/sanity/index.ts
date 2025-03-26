/**
 * TypeScript type definitions for Sanity content models
 * 
 * These types help ensure type safety when working with content from Sanity CMS
 */

// Author type definition
export interface SanityAuthor {
  _id: string;
  _type: 'author';
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  bio?: any[]; // Portable Text format
}

// Category type definition
export interface SanityCategory {
  _id: string;
  _type: 'category';
  title: string;
  description?: string;
  slug: {
    current: string;
  };
}

// Tag type definition
export interface SanityTag {
  _id: string;
  _type: 'tag';
  name: string;
  slug: {
    current: string;
  };
}

// Post type definition
export interface SanityPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  author: {
    _ref: string;
    _type: 'reference';
  };
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  mainImageUrl?: string;
  categories?: Array<{
    _key: string;
    _ref: string;
    _type: 'reference';
  }>;
  tags?: Array<{
    _key: string;
    _ref: string;
    _type: 'reference';
  }>;
  publishedAt: string;
  body: any[]; // Portable Text format
  excerpt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  };
}