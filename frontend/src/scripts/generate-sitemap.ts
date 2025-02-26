import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'src/pages/**/*.tsx',
    'src/pages/**/*.ts',
    'src/pages/**/*.js',
    'src/pages/**/*.jsx',
    '!src/pages/_*.tsx',
    '!src/pages/_*.ts',
    '!src/pages/api',
    '!src/pages/404.tsx',
  ]);

  // Fetch blog posts from API or CMS
  // For demo purposes, we'll use dummy data
  const blogSlugs = ['dental-hygiene', 'tooth-whitening', 'dental-implants'];
  
  // Fetch service pages
  const serviceSlugs = ['general-dentistry', 'cosmetic-dentistry', 'orthodontics', 'oral-surgery'];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('src/pages', '')
            .replace('.tsx', '')
            .replace('.ts', '')
            .replace('.jsx', '')
            .replace('.js', '')
            .replace('/index', '');
          
          const route = path === '/index' ? '' : path;
          
          return `
            <url>
              <loc>${`https://example.com${route}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
      
      ${blogSlugs
        .map((slug) => {
          return `
            <url>
              <loc>${`https://example.com/blog/${slug}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
        
      ${serviceSlugs
        .map((slug) => {
          return `
            <url>
              <loc>${`https://example.com/services/${slug}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  writeFileSync('public/sitemap.xml', formatted);
  console.log('Sitemap generated successfully!');
}

generateSitemap(); 