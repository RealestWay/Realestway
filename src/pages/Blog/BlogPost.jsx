import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageNav from "../../components/PageNav";
import Footer from "../../components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "How to Find a Student Apartment Fast",
    slug: "find-student-apartment-fast",
    excerpt:
      "Discover strategies to quickly find and secure student housing near your campus.",
    content: "...",
    date: "2025-07-15",
    category: "Student Housing",
    readTime: "4 min read",
    image: "/Realestway horizontal.svg",
    alt: "Student studying in apartment lounge",
  },
  {
    id: 2,
    title: "5 Tips for First-Time Home Buyers",
    slug: "first-time-home-buyer-tips",
    excerpt:
      "Essential advice for navigating the home buying process as a beginner.",
    content: "...",
    date: "2025-07-10",
    category: "Home Buying",
    readTime: "6 min read",
    image: "/images/blog/home-buying.jpg",
    alt: "Couple signing home documents",
  },
];

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <>
        {" "}
        <PageNav />
        <div className="text-center py-16 min-h-[100vh]">Article not found</div>
        <Footer />
      </>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | Realestway Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <PageNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-4">
            <Link to="/blog" className="hover:text-[#00a256]">
              Blog
            </Link>{" "}
            / <span>{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10 rounded-xl overflow-hidden">
          <img src={post.image} alt={post.alt} className="w-full h-auto" />
        </div>

        {/* Article Content */}
        <article className="prose max-w-none mb-12">
          {/* Your actual post content would go here */}
          <p>{post.content}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Finding the Perfect Location
          </h2>
          <p>
            When searching for student housing, location should be your top
            priority...
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Proximity to Campus
          </h3>
          <p>
            Living close to campus can save you time and transportation costs...
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Budgeting Tips</h2>
          <p>Student housing comes with various costs beyond just rent...</p>
        </article>

        {/* Sharing Options */}
        <div className="mb-12">
          <h4 className="text-lg font-semibold mb-4">Share this article</h4>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?url=https://realestway.com/blog/${
                post.slug
              }&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://realestway.com/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https://realestway.com/blog/${
                post.slug
              }&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-8">You might also like</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="h-40 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-[#100073] to-[#00a256] text-white rounded-xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">
              Get more real estate insights
            </h3>
            <p className="mb-6 opacity-90">
              Subscribe to our newsletter for the latest tips and market updates
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-[#100073] font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
