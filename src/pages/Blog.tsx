import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, User, ChevronRight, Tag, Loader2 } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllPosts, getAllCategories } from '../lib/queries';
import { urlFor } from '../lib/sanity';

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching blog data...');
        
        // Fetch posts
        const fetchedPosts = await getAllPosts();
        console.log('Fetched posts:', fetchedPosts);
        
        // Fetch categories
        const fetchedCategories = await getAllCategories();
        console.log('Fetched categories:', fetchedCategories);
        
        if (Array.isArray(fetchedPosts)) {
          setPosts(fetchedPosts);
        } else {
          console.error('Fetched posts is not an array:', fetchedPosts);
          setPosts([]);
        }
        
        if (Array.isArray(fetchedCategories)) {
          setCategories(fetchedCategories);
        } else {
          console.error('Fetched categories is not an array:', fetchedCategories);
          setCategories([]);
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog posts. Please try again later.');
        
        // In development, use fallback data for testing
        if (import.meta.env.DEV) {
          console.log('Using fallback data for development');
          setPosts([
            {
              _id: 'fallback-1',
              title: 'Fallback Post 1',
              slug: 'fallback-post-1',
              excerpt: 'This is a fallback post while CORS is being configured.',
              author: { name: 'Developer', role: 'Admin' },
              date: new Date().toISOString(),
              category: 'Development',
              tags: ['Fallback', 'Development'],
              mainImage: {
                asset: {
                  url: 'https://via.placeholder.com/800x450?text=No+Image'
                }
              }
            },
            {
              _id: 'fallback-2',
              title: 'Fallback Post 2',
              slug: 'fallback-post-2',
              excerpt: 'This is another fallback post while CORS is being configured.',
              author: { name: 'Developer', role: 'Admin' },
              date: new Date().toISOString(),
              category: 'Testing',
              tags: ['Fallback', 'Testing'],
              mainImage: {
                asset: {
                  url: 'https://via.placeholder.com/800x450?text=No+Image'
                }
              }
            }
          ]);
          
          setCategories([
            { _id: 'dev', title: 'Development' },
            { _id: 'test', title: 'Testing' }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update selectedCategory when searchParams changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter(post => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams(category ? { category } : {});
  };

  // Function to get image URL (handles both Sanity images and direct URLs)
  const getImageUrl = (post: any) => {
    if (post.mainImage && post.mainImage.asset) {
      return urlFor(post.mainImage).width(600).height(400).url();
    } else if (post.mainImageUrl) {
      return post.mainImageUrl;
    } else {
      return 'https://via.placeholder.com/800x450?text=No+Image';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in HR management
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category.title)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.title
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Loading posts...</span>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="glass-effect rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={getImageUrl(post)}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author?.name || 'Unknown Author'}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {post.category}
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center text-primary hover:text-indigo-700 text-sm font-medium"
                      >
                        Read more
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                No posts found
              </h2>
              <p className="text-gray-600">
                {selectedCategory
                  ? `No posts found in the "${selectedCategory}" category.`
                  : 'No blog posts available at the moment.'}
              </p>
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryChange('')}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  View all posts
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}