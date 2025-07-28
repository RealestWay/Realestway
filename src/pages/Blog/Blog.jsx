import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageNav from "../../components/PageNav";
import Footer from "../../components/Footer";
import { useState } from "react";

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

const categories = [...new Set(blogPosts.map((post) => post.category))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Realestway Blog | Real Estate Tips & Insights</title>
        <meta
          name="description"
          content="Expert advice on student housing, home buying, renting, and real estate investment from Realestway."
        />
      </Helmet>

      <PageNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#100073] to-[#00a256] text-white py-16 text-center mb-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Realestway Blog</h1>
            <p className="text-xl opacity-90">
              Expert insights on student housing, home buying, and real estate
              investment
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          {/* Sidebar */}
          <aside className="md:w-72 sticky top-6 h-fit">
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a256] focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeCategory === "All"
                        ? "bg-[#00a256] text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveCategory("All")}
                  >
                    All Articles
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeCategory === category
                          ? "bg-[#00a256] text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Get the latest real estate tips delivered to your inbox
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00a256] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-[#00a256] text-white py-2 px-4 rounded-md hover:bg-[#008c4a] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>

          {/* Articles */}
          <div className="flex-1">
            {filteredPosts.length > 0 ? (
              <div className="grid gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <span className="inline-block bg-[#100073] text-white text-xs px-2 py-1 rounded mb-3">
                          {post.category}
                        </span>
                        <h2 className="text-2xl font-bold mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
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
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
