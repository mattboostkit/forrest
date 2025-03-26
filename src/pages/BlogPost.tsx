import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Loader2 } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { PortableText } from '../lib/portableText';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          setError('Post ID is missing');
          setLoading(false);
          return;
        }
        
        const postData = await getPostBySlug(id);
        
        if (!postData) {
          setError('Post not found');
          setLoading(false);
          return;
        }
        
        setPost(postData);
        
        // Fetch related posts
        if (postData.tags && postData.tags.length > 0) {
          const tagTitles = postData.tags.map((tag: any) => tag.title);
          const related = await getRelatedPosts(postData.slug, tagTitles);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Blog Post Not Found'}
          </h2>
          <Link
            to="/blog"
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <button
            onClick={() => navigate('/blog')}
            className="mb-8 text-gray-100 hover:text-white inline-flex items-center transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </button>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center justify-center gap-6 text-indigo-100">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {post.author.name}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 -mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect p-8 rounded-lg">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <img
                  src={urlFor(post.mainImage).width(1200).height(600).url()}
                  alt={post.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              
              <div className="flex items-center mb-8">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>

              <div className="mb-8">
                {post.categories && post.categories.map((category: any, index: number) => (
                  <span 
                    key={index} 
                    className="inline-block bg-primary-light text-primary text-sm px-3 py-1 rounded-full mr-2"
                  >
                    {category.title}
                  </span>
                ))}
              </div>

              <div className="text-gray-600 space-y-6">
                <p className="text-xl font-medium text-gray-900">{post.excerpt}</p>
                
                {/* Render rich text content */}
                <div className="portable-text">
                  <PortableText value={post.body} />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags && post.tags.map((tag: any, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                    >
                      Read more
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export { BlogPost };