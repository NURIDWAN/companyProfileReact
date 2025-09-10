// src/components/LatestArticles.jsx
import { CalendarDays, Eye, Clock, ArrowRight, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Data for the articles
const articlesData = [
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
    category: "Technology Trends",
    readTime: "3 min",
    date: "21 Jun 2025",
    views: "156",
    title: "Artificial Intelligence dalam Pengembangan Software Modern",
    description: "Eksplorasi bagaimana AI mengubah landscape pengembangan software dan dampaknya terhadap industri teknologi.",
    author: "Admin",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
    category: "Web Development",
    readTime: "5 min",
    date: "18 Jun 2025",
    views: "243",
    title: "Laravel 11: Fitur Baru dan Peningkatan Performance",
    description: "Overview lengkap tentang fitur-fitur baru Laravel 11 dan bagaimana memanfaatkannya untuk development yang lebih efisien.",
    author: "Admin",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
    category: "Mobile Development",
    readTime: "3 min",
    date: "16 Jun 2025",
    views: "189",
    title: "React Native vs Flutter: Pilihan Terbaik untuk Cross-Platform Development",
    description: "Perbandingan mendalam antara React Native dan Flutter untuk membantu developer memilih framework yang tepat.",
    author: "Admin",
  },
];

export function LatestArticles() {
  return (
    <section id="articles" className="w-full py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Artikel Terbaru
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Dapatkan insight terbaru, tips, dan tren teknologi dari para ahli kami untuk membantu mengembangkan bisnis Anda
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg border-none transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
              {/* Image and Badges */}
              <div className="relative w-full h-48 sm:h-56">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge className="bg-gray-900/60 backdrop-blur-sm text-white px-3 py-1 font-normal text-xs">{article.category}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center bg-gray-900/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>

              {/* Article Content */}
              <CardContent className="flex flex-col p-6 text-left flex-grow">
                {/* Metadata */}
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" /> {article.date}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" /> {article.views}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">{article.description}</p>
                
                {/* Author and Read More */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="h-4 w-4 mr-2" /> {article.author}
                  </span>
                  <a href="#" className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group">
                    Baca <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* "View All Articles" Button */}
        <div className="mt-12">
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            <ArrowRight className="mr-2 h-4 w-4" /> Lihat Semua Artikel
          </Button>
        </div>
      </div>
    </section>
  );
}