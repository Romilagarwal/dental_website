import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const POSTS_PATH = path.join(process.cwd(), 'content/posts');

export async function getPostBySlug(slug: string) {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypePrism,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
    scope: data,
  });

  return {
    source: mdxSource,
    frontMatter: {
      slug,
      excerpt: data.excerpt,
      ...data,
    },
  };
}

export async function getAllPosts() {
  const posts = fs.readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, fileName));
      const { data } = matter(source);

      return {
        frontMatter: {
          ...data,
          slug: fileName.replace(/\.mdx?$/, ''),
        },
      };
    });

  return posts.sort((a, b) => {
    return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
  });
} 