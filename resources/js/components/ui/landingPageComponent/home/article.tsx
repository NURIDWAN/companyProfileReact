import { CalendarDays, Clock, ArrowRight, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

type ArticleItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image?: string | null;
  published_at?: string | null;
  author?: string | null;
};

interface LatestArticlesProps {
  articles?: ArticleItem[];
}

export function LatestArticles({ articles = [] }: LatestArticlesProps) {
  const hasArticles = articles.length > 0;

  return (
    <motion.section
      id="articles"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full bg-white py-12 sm:py-16 lg:py-20 dark:bg-gray-950"
    >
      <motion.div
        className="container mx-auto max-w-screen-xl px-4 text-center"
        variants={containerVariants}
      >
        <motion.div
          className="mb-12"
          variants={itemVariants}
        >
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Artikel Terbaru
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Dapatkan insight terbaru, tips, dan tren teknologi dari para ahli kami untuk membantu mengembangkan bisnis Anda
          </p>
        </motion.div>

        {/* Articles Grid */}
        {hasArticles ? (
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {articles.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
            <Card className="flex h-full flex-col overflow-hidden border-none shadow-lg">
              {/* Image and Badges */}
              <div className="relative w-full h-48 sm:h-56">
                <img
                  src={article.cover_image ?? "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge className="bg-gray-900/60 backdrop-blur-sm text-white px-3 py-1 font-normal text-xs">Insight</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center bg-gray-900/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.excerpt ? `${Math.max(3, Math.round(article.excerpt.length / 400))} min` : "3 min"}
                </div>
              </div>

              {/* Article Content */}
              <CardContent className="flex flex-col p-6 text-left flex-grow">
                {/* Metadata */}
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" />{" "}
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString("id-ID")
                      : "Segera hadir"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                  {article.excerpt ?? "Insight terbaru dari tim kami seputar transformasi digital dan teknologi bisnis."}
                </p>

                {/* Author and Read More */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="h-4 w-4 mr-2" /> {article.author ?? "Tim Konten"}
                  </span>
                  <Link href={`/blog/${article.slug}`} className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group">
                    Baca <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>
        ) : (
        <motion.div
          variants={itemVariants}
          className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground"
        >
          Belum ada artikel yang dipublikasikan.
        </motion.div>
        )}
        </motion.div>
    </motion.section>
  );
}
