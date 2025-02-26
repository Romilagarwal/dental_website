import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiUser, FiCalendar, FiShare2, FiTag } from 'react-icons/fi';
import SEOHead from '../../components/SEO/SEOHead';

// Sample blog data (same as in blog index)
const blogPosts = [
  {
    id: '1',
    slug: 'importance-of-regular-dental-checkups',
    title: 'The Importance of Regular Dental Check-ups',
    excerpt: 'Regular dental check-ups are essential for maintaining not just oral health, but overall well-being. Learn why you should visit your dentist every six months.',
    featuredImage: '/images/blog/dental-checkup.jpg',
    date: 'April 15, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Preventive Care',
    tags: ['dental health', 'prevention', 'checkups'],
    readTime: 5,
    content: `
      <h2>Why Regular Dental Check-ups Matter</h2>
      <p>Regular dental check-ups are a crucial part of maintaining good oral health and preventing serious dental issues. When you visit your dentist every six months, you're not just getting your teeth cleaned – you're taking a proactive step toward preventive care that can save you time, money, and discomfort in the long run.</p>
      
      <p>During a routine dental check-up, your dentist will perform a thorough examination of your teeth, gums, and mouth. This examination allows them to detect early signs of problems such as tooth decay, gum disease, and even oral cancer. Early detection is key to successful treatment and preventing these issues from becoming more serious.</p>
      
      <h2>What Happens During a Dental Check-up?</h2>
      <p>A typical dental check-up consists of two parts: the dental examination and the professional cleaning.</p>
      
      <h3>The Dental Examination</h3>
      <p>During the examination, your dentist will:</p>
      <ul>
        <li>Examine your teeth for signs of decay</li>
        <li>Check your gums for signs of inflammation or recession</li>
        <li>Evaluate your risk of developing tooth decay and other oral health problems</li>
        <li>Check your face, neck, and mouth for abnormalities</li>
        <li>Take X-rays if necessary to see what's happening beneath the surface</li>
      </ul>
      
      <h3>Professional Cleaning</h3>
      <p>Professional dental cleaning, also known as prophylaxis, is performed by a dental hygienist. This cleaning involves:</p>
      <ul>
        <li>Removing plaque and tartar (hardened plaque) from your teeth</li>
        <li>Polishing your teeth to remove stains and remaining plaque</li>
        <li>Flossing between your teeth</li>
        <li>Reviewing proper brushing and flossing techniques</li>
      </ul>
      
      <p>Even if you brush and floss regularly at home, professional cleaning is essential because it removes tartar that can't be removed by brushing alone.</p>
      
      <h2>The Connection Between Oral Health and Overall Health</h2>
      <p>Research has shown that oral health is closely linked to overall health. Poor oral health has been associated with several health problems, including:</p>
      <ul>
        <li>Cardiovascular disease</li>
        <li>Respiratory infections</li>
        <li>Diabetes</li>
        <li>Pregnancy complications</li>
      </ul>
      
      <p>By maintaining good oral health through regular dental check-ups, you're not just taking care of your teeth – you're contributing to your overall well-being.</p>
      
      <h2>How Often Should You Visit the Dentist?</h2>
      <p>For most people, visiting the dentist twice a year (every six months) is recommended. However, some individuals may need more frequent visits depending on their specific oral health needs. Factors that might necessitate more frequent dental visits include:</p>
      <ul>
        <li>A history of gum disease</li>
        <li>A high risk of cavities</li>
        <li>Diabetes</li>
        <li>Smoking</li>
        <li>Pregnancy</li>
        <li>A weakened immune system</li>
      </ul>
      
      <p>Your dentist will recommend a check-up schedule that's appropriate for your individual needs.</p>
      
      <h2>Conclusion</h2>
      <p>Regular dental check-ups are an essential part of preventive dental care. By visiting your dentist every six months, you can catch potential problems early, maintain good oral health, and contribute to your overall well-being. Don't wait until you experience pain or discomfort – schedule your next dental check-up today!</p>
    `
  },
  {
    id: '2',
    slug: 'proper-brushing-techniques',
    title: 'Proper Brushing Techniques for Optimal Oral Health',
    excerpt: 'Are you brushing your teeth correctly? Discover the proper techniques that can help prevent cavities and gum disease.',
    featuredImage: '/images/blog/brushing-techniques.jpg',
    date: 'May 2, 2023',
    author: 'Dr. Reishu Agarwal',
    category: 'Oral Hygiene',
    tags: ['brushing', 'oral hygiene', 'dental care'],
    readTime: 4,
    content: `
      <h2>The Importance of Proper Brushing</h2>
      <p>Brushing your teeth is a daily routine that most people perform without much thought. However, the effectiveness of your brushing depends greatly on your technique. Proper brushing helps remove plaque, a sticky film of bacteria that forms on your teeth. If left unchecked, plaque can lead to tooth decay, gum disease, and eventually tooth loss.</p>
      
      <h2>Choosing the Right Toothbrush</h2>
      <p>Before we discuss technique, it's important to ensure you're using the right tool for the job:</p>
      <ul>
        <li><strong>Bristles:</strong> Soft bristles are recommended for most people as they're gentle on the gums while still effective at cleaning.</li>
        <li><strong>Size:</strong> The head of your toothbrush should be small enough to reach all areas of your mouth, including the back teeth.</li>
        <li><strong>Handle:</strong> Choose a handle that feels comfortable in your hand.</li>
        <li><strong>Manual vs. Electric:</strong> Both can be effective. Electric toothbrushes may make proper brushing easier for some people.</li>
      </ul>
      
      <h2>The Proper Brushing Technique</h2>
      <p>Follow these steps for the most effective brushing:</p>
      
      <h3>1. Position your toothbrush correctly</h3>
      <p>Hold your toothbrush at a 45-degree angle to your gums. This position allows the bristles to clean both the tooth surface and just under the gumline, where plaque often accumulates.</p>
      
      <h3>2. Use gentle, short strokes</h3>
      <p>Brush using short, gentle back-and-forth motions about the width of a tooth. Aggressive scrubbing can damage your gums and tooth enamel.</p>
      
      <h3>3. Brush all surfaces</h3>
      <p>Be sure to brush:</p>
      <ul>
        <li>The outer surfaces of your teeth</li>
        <li>The inner surfaces of your teeth</li>
        <li>The chewing surfaces of your teeth</li>
      </ul>
      
      <h3>4. Don't forget your tongue</h3>
      <p>Gently brush your tongue to remove bacteria and freshen your breath.</p>
      
      <h3>5. Timing is important</h3>
      <p>Brush for a full two minutes, spending about 30 seconds on each quadrant of your mouth (upper right, upper left, lower right, lower left).</p>
      
      <h2>Common Brushing Mistakes to Avoid</h2>
      <ul>
        <li><strong>Brushing too hard:</strong> This can damage your gums and wear down tooth enamel.</li>
        <li><strong>Using a toothbrush with hard bristles:</strong> This can also damage gums and enamel.</li>
        <li><strong>Brushing immediately after eating acidic foods:</strong> Wait at least 30 minutes after consuming acidic foods or drinks before brushing.</li>
        <li><strong>Not replacing your toothbrush regularly:</strong> Replace your toothbrush or electric toothbrush head every 3-4 months, or sooner if the bristles become frayed.</li>
        <li><strong>Brushing in the same pattern:</strong> Always starting in the same place can lead to some areas being cleaned less thoroughly as you lose interest at the end.</li>
      </ul>
      
      <h2>Beyond Brushing: A Complete Oral Hygiene Routine</h2>
      <p>While proper brushing is essential, it's only one part of a complete oral hygiene routine:</p>
      <ul>
        <li><strong>Floss daily:</strong> Flossing removes plaque and food particles from between teeth where your toothbrush can't reach.</li>
        <li><strong>Use mouthwash:</strong> An antimicrobial mouthwash can help reduce plaque, prevent or reduce gingivitis, and freshen breath.</li>
        <li><strong>Visit your dentist regularly:</strong> Professional cleanings and check-ups are essential for maintaining oral health.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Proper brushing technique is a fundamental aspect of good oral hygiene. By using the right toothbrush and following the correct technique, you can effectively remove plaque, prevent cavities and gum disease, and maintain a healthy smile for years to come. Remember, it's not just about brushing—it's about brushing properly!</p>
    `
  },
  // Add content for the remaining blog posts similarly
];

const BlogPost: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post && typeof slug === 'string') {
    return (
      <div className="post-not-found">
        <div className="container">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog">
            <a className="back-to-blog">Back to Blog</a>
          </Link>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null; // Loading state or redirect
  }
  
  return (
    <>
      <SEOHead 
        title={`${post.title} | Dr. Reishu Agarwal's Dental Clinic Blog`}
        description={post.excerpt}
        structuredData={{
          type: 'BlogPosting',
          data: {
            headline: post.title,
            image: post.featuredImage,
            datePublished: post.date,
            author: {
              name: post.author
            }
          }
        }}
      />
      
      <article className="blog-post">
        <div className="blog-post-hero" style={{ backgroundImage: `url(${post.featuredImage})` }}>
          <div className="overlay"></div>
          <div className="container">
            <div className="blog-post-hero-content">
              <Link href="/blog">
                <a className="back-button">
                  <FiArrowLeft /> Back to Blog
                </a>
              </Link>
              <h1>{post.title}</h1>
              <div className="post-meta">
                <div className="meta-item">
                  <FiUser />
                  <span>{post.author}</span>
                </div>
                <div className="meta-item">
                  <FiCalendar />
                  <span>{post.date}</span>
                </div>
                <div className="meta-item">
                  <FiClock />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="blog-post-content">
          <div className="container">
            <div className="content-wrapper">
              <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              
              <div className="post-footer">
                <div className="post-tags">
                  <FiTag />
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="post-share">
                  <span>Share:</span>
                  <button className="share-button">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <style jsx>{`
        .blog-post-hero {
          position: relative;
          padding: 150px 0 80px;
          background-size: cover;
          background-position: center;
          color: white;
        }
        
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%);
        }
        
        .container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .blog-post-hero-content {
          text-align: center;
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          color: white;
          margin-bottom: 2rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          background-color: rgba(255,255,255,0.1);
          transition: background-color 0.3s ease;
        }
        
        .back-button:hover {
          background-color: rgba(255,255,255,0.2);
        }
        
        .back-button svg {
          margin-right: 0.5rem;
        }
        
        .blog-post-hero-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        
        .post-meta {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
        }
        
        .meta-item svg {
          margin-right: 0.5rem;
        }
        
        .blog-post-content {
          padding: 3rem 0 5rem;
        }
        
        .content-wrapper {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          padding: 2.5rem;
        }
        
        .post-content {
          line-height: 1.7;
        }
        
        .post-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #2d3748;
        }
        
        .post-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 1rem;
          color: #2d3748;
        }
        
        .post-content p {
          margin-bottom: 1.5rem;
          color: #4a5568;
        }
        
        .post-content ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          list-style-type: disc;
          color: #4a5568;
        }
        
        .post-content li {
          margin-bottom: 0.5rem;
        }
        
        .post-footer {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .post-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .post-tags svg {
          margin-right: 0.5rem;
          color: #718096;
        }
        
        .tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background-color: #edf2f7;
          color: #4a5568;
          font-size: 0.875rem;
        }
        
        .post-share {
          display: flex;
          align-items: center;
        }
        
        .post-share span {
          margin-right: 0.5rem;
          color: #718096;
        }
        
        .share-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          background-color: #edf2f7;
          color: #4a5568;
          transition: background-color 0.3s ease;
        }
        
        .share-button:hover {
          background-color: #e2e8f0;
        }
        
        .post-not-found {
          padding: 6rem 0;
          text-align: center;
        }
        
        .post-not-found h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #2d3748;
        }
        
        .post-not-found p {
          margin-bottom: 2rem;
          color: #4a5568;
        }
        
        .back-to-blog {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          background-color: #3182ce;
          color: white;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        
        .back-to-blog:hover {
          background-color: #2c5282;
        }
        
        @media (max-width: 640px) {
          .blog-post-hero-content h1 {
            font-size: 1.875rem;
          }
          
          .content-wrapper {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPost; 