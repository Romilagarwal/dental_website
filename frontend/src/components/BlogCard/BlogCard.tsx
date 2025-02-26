import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRegClock, FaRegComment, FaBookmark } from 'react-icons/fa';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  date: string;
  author: string;
  readTime: number;
  commentCount: number;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  slug,
  imageUrl,
  date,
  author,
  readTime,
  commentCount,
  category
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/blog/${slug}`}>
        <a className="block">
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              {category}
            </span>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-4">{excerpt}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{author}</span>
              <span>{date}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="flex items-center"><FaRegClock className="mr-1" /> {readTime} min read</span>
                <span className="flex items-center"><FaRegComment className="mr-1" /> {commentCount}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <FaBookmark />
              </button>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
