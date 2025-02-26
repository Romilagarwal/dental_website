import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import './BlogPost.scss';

interface BlogPostProps {
  frontMatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
  };
  content: any; // MDX content
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ frontMatter, content, slug }) => {
  const components = {
    Image: (props: any) => (
      <div className="blog-image">
        <Image
          {...props}
          width={800}
          height={400}
          layout="responsive"
          loading="lazy"
        />
      </div>
    ),
    // Add custom MDX components here
  };

  return (
    <>
      <NextSeo
        title={`${frontMatter.title} | Dr. Reishu Agarwal's Dental Clinic`}
        description={frontMatter.description}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.description,
          images: [{ url: frontMatter.image }],
          type: 'article',
          article: {
            publishedTime: frontMatter.date,
            authors: [frontMatter.author],
            tags: frontMatter.tags,
          },
        }}
        canonical={`https://yourdomain.com/blog/${slug}`}
      />

      <motion.article
        className="blog-post"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="blog-header">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {frontMatter.title}
          </motion.h1>
          <div className="blog-meta">
            <span>{new Date(frontMatter.date).toLocaleDateString()}</span>
            <span>{frontMatter.author}</span>
          </div>
          <div className="blog-tags">
            {frontMatter.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="blog-content">
          <MDXRemote {...content} components={components} />
        </div>
      </motion.article>
    </>
  );
};

export default BlogPost; 