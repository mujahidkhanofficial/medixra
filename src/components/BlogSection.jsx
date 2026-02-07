import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Innovations in Patient Monitoring Systems for 2024",
    excerpt: "Discover how AI and remote connectivity are revolutionizing patient care in modern ICUs.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600",
    date: "Jan 15, 2024",
    author: "Dr. Sarah Chen"
  },
  {
    id: 2,
    title: "Guide to Purchasing Refurbished Medical Equipment",
    excerpt: "What to look for when buying pre-owned equipment to ensure quality and compliance.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600",
    date: "Jan 10, 2024",
    author: "Mark Wilson"
  },
  {
    id: 3,
    title: "The Future of Telemedicine Hardware",
    excerpt: "Exploring the next generation of connected devices supporting remote diagnostics.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
    date: "Jan 05, 2024",
    author: "Elena Rodriguez"
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
            Latest Industry Insights
          </h2>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in medical technology and healthcare equipment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-olive-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-charcoal-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-olive-600" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-olive-600" />
                    {post.author}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-olive-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-charcoal-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Button variant="link" className="p-0 text-olive-600 hover:text-olive-700 font-semibold">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;