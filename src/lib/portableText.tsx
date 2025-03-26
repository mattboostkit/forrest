import React from 'react';
import {PortableText as PortableTextComponent} from '@portabletext/react';
import {urlFor} from './sanity';

// Custom components for the Portable Text renderer
const components = {
  types: {
    image: ({value}: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ' '}
            className="rounded-lg shadow-md"
            loading="lazy"
          />
          {value.caption && (
            <div className="mt-2 text-sm text-gray-600 italic text-center">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    callout: ({value}: any) => {
      return (
        <div className={`p-4 my-6 rounded-lg border-l-4 ${
          value.tone === 'info' 
            ? 'bg-blue-50 border-blue-500' 
            : value.tone === 'warning'
            ? 'bg-amber-50 border-amber-500'
            : value.tone === 'success'
            ? 'bg-green-50 border-green-500'
            : 'bg-gray-50 border-gray-500'
        }`}>
          <div className="prose prose-sm sm:prose lg:prose-lg">
            <PortableTextComponent value={value.content} />
          </div>
        </div>
      );
    },
    gallery: ({value}: any) => {
      if (!value?.images || !value.images.length) {
        return null;
      }
      
      return (
        <div className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {value.images.map((image: any, index: number) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={urlFor(image).width(400).height(300).url()}
                  alt={image.alt || ' '}
                  className="w-full h-64 object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
                {image.caption && (
                  <div className="p-2 text-sm text-gray-600 italic">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
          {value.caption && (
            <div className="mt-2 text-sm text-gray-600 italic text-center">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({value}: any) => {
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          <code>{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({children, value}: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
    internalLink: ({children, value}: any) => {
      return (
        <a 
          href={`/${value.slug}`} 
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({children}: any) => <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>,
    normal: ({children}: any) => <p className="my-4 text-gray-700">{children}</p>,
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc pl-5 my-4 space-y-1">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal pl-5 my-4 space-y-1">{children}</ol>,
  },
};

export function PortableText({value}: {value: any}) {
  return <PortableTextComponent value={value} components={components} />;
}
