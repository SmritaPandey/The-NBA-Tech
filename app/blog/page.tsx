"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollspyNav } from "@/components/scrollspy-nav"
import { Footer } from "@/components/footer"
import { ArrowRight, Search, Calendar, Clock, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Cybersecurity in a Post-Quantum World",
    excerpt: "Exploring how quantum computing will transform cybersecurity and what organizations need to do to prepare.",
    category: "Cybersecurity",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Alex Johnson",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Building Scalable Microservices with Spring Boot and Kubernetes",
    excerpt: "A practical guide to designing, implementing, and deploying microservices using Spring Boot and Kubernetes.",
    category: "Development",
    date: "April 28, 2023",
    readTime: "12 min read",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "The Role of AI in Modern Enterprise Security Operations",
    excerpt: "How artificial intelligence is revolutionizing security operations centers and threat detection.",
    category: "AI",
    date: "April 10, 2023",
    readTime: "6 min read",
    author: "Michael Rodriguez",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Implementing Zero Trust Architecture in Financial Services",
    excerpt: "A comprehensive approach to implementing zero trust security models in banking and financial institutions.",
    category: "Cybersecurity",
    date: "March 22, 2023",
    readTime: "10 min read",
    author: "Emily Wong",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1968&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "The Impact of 5G on Enterprise IoT Solutions",
    excerpt: "Exploring how 5G networks will transform IoT implementations and create new business opportunities.",
    category: "Infrastructure",
    date: "March 15, 2023",
    readTime: "7 min read",
    author: "David Park",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "DevSecOps: Integrating Security into the CI/CD Pipeline",
    excerpt: "Best practices for embedding security controls and testing throughout the development lifecycle.",
    category: "DevOps",
    date: "February 28, 2023",
    readTime: "9 min read",
    author: "Rachel Adams",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070&auto=format&fit=crop",
    featured: false,
  },
]

const categories = ["All", "Cybersecurity", "Development", "AI", "Infrastructure", "DevOps"]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find((post) => post.featured)

  return (
    <main className="flex min-h-screen flex-col">
      <ScrollspyNav />
      
      {/* Hero Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, tutorials, and updates from our team of experts
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="overflow-hidden h-full">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                    <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                    </div>
                    <Button className="w-fit group">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Blog Posts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent space-x-2 justify-center">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full ${
                      activeCategory === category
                        ? "bg-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))]"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    >
                      <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <span className="text-xs text-muted-foreground">{post.date}</span>
                          </div>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.readTime}
                            </div>
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {post.author}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" className="w-full justify-between group">
                            Read More
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setActiveCategory("All")
                        setSearchQuery("")
                      }} 
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg">
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-[hsl(var(--deep-blue))] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-white/70 mb-8">
              Subscribe to our newsletter for the latest insights, tutorials, and updates.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-[hsl(var(--electric-cyan))] hover:bg-[hsl(var(--electric-cyan))/90] text-[hsl(var(--deep-blue))]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
