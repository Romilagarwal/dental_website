import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiTag } from 'react-icons/fi';
import './BlogList.scss';

interface BlogPost {
  slug: string;
  frontMatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
    readTime: string;
  };
}

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post, index) => (
        <motion.article
          key={post.slug}
          className="blog-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`}>
            <a className="blog-card-link">
              <div className="blog-card-image">
                <Image
                  src={post.frontMatter.image}
                  alt={post.frontMatter.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="blog-card-content">
                <h2>{post.frontMatter.title}</h2>
                <p>{post.frontMatter.description}</p>
                <div className="blog-card-meta">
                  <span>
                    <FiUser />
                    {post.frontMatter.author}
                  </span>
                  <span>
                    <FiClock />
                    {post.frontMatter.readTime}
                  </span>
                  <span>
                    <FiTag />
                    {post.frontMatter.tags[0]}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </motion.article>
      ))}
    </div>
  );
};

export default BlogList; 