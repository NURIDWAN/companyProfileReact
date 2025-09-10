import LandingPageLayout from '@/layouts/landingPage-layouts';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  User, 
  Eye,
  Heart,
  Share2,
  Image,
  Search,
  Clock,
  TrendingUp,
  BookOpen
} from 'lucide-react';

// --- TIPE DATA & INTERFACE ---

// Mendefinisikan struktur objek untuk sebuah post blog
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  featured: boolean;
};


// --- DATA & KONSTANTA ---
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Tren Teknologi 2024: Yang Perlu Diketahui Developer",
    excerpt: "Jelajahi tren teknologi terbaru yang akan membentuk industri software development di tahun 2024...",
    author: "Ahmad Riadi",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Technology",
    image: "https://picsum.photos/seed/tech-1/400/300",
    views: 1250,
    likes: 89,
    featured: true,
  },
  {
    id: 2,
    title: "Strategi Digital Marketing untuk UMKM",
    excerpt: "Tips dan strategi efektif untuk mengembangkan bisnis UMKM melalui digital marketing...",
    author: "Sari Dewi",
    date: "2024-01-10",
    readTime: "7 min",
    category: "Business",
    image: "https://picsum.photos/seed/business-2/400/300",
    views: 980,
    likes: 65,
    featured: false,
  },
  {
    id: 3,
    title: "Desain UI/UX: Prinsip Dasar yang Harus Dipahami",
    excerpt: "Membahas prinsip dasar dalam desain UI/UX agar aplikasi atau website lebih mudah digunakan...",
    author: "Lina Pratama",
    date: "2024-01-05",
    readTime: "6 min",
    category: "Design",
    image: "https://picsum.photos/seed/design-3/400/300",
    views: 720,
    likes: 42,
    featured: false,
  },
  {
    id: 4,
    title: "SEO Modern: Cara Meningkatkan Ranking Website",
    excerpt: "Panduan praktis tentang teknik SEO terbaru untuk membantu website Anda...",
    author: "Budi Santoso",
    date: "2024-01-02",
    readTime: "8 min",
    category: "Marketing",
    image: "https://picsum.photos/seed/marketing-4/400/300",
    views: 1340,
    likes: 97,
    featured: true,
  },
];





const categories: string[] = ['All', 'Technology', 'Business', 'Design', 'Marketing'];
const popularTags: string[] = ['React', 'JavaScript', 'UI/UX', 'SEO', 'Digital Marketing', 'Node.js', 'API', 'Mobile App'];


// --- KOMPONEN UI ---

const BlogHeader: React.FC = () => (
  <div className="text-center space-y-4">
    <h1 className="text-4xl font-bold text-gray-900">Blog & Artikel</h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Baca artikel terbaru tentang teknologi, bisnis, desain, dan industri terkini. 
      Dapatkan insights dari para ahli dan praktisi berpengalaman.
    </p>
  </div>
);

// Tipe untuk props SearchAndFilter
type SearchAndFilterProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => (
  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Cari artikel..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(category)}
          size="sm"
        >
          {category}
        </Button>
      ))}
    </div>
  </div>
);

// Tipe untuk props BlogPostCard
type BlogPostCardProps = {
  post: BlogPost;
  isFeatured?: boolean;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, isFeatured = false }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    {/* Gambar artikel */}
    <div className="aspect-video bg-gray-200 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover"
      />
    </div>

    <CardHeader>
      <div className="flex justify-between items-start mb-2">
        <div>
          {isFeatured && (
            <Badge variant="default" className="bg-blue-600 mr-2">
              Featured
            </Badge>
          )}
          <Badge variant="outline">{post.category}</Badge>
        </div>
        {!isFeatured && (
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {post.likes}
            </span>
          </div>
        )}
      </div>
      <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
        {post.title}
      </CardTitle>
      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
    </CardHeader>

    <CardContent>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
        {isFeatured && (
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {post.likes}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString('id-ID')}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readTime}
        </span>
      </div>
      <div className="flex gap-2 mt-4">
        <Button size="sm" className="flex-1">
          Baca Selengkapnya
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);


// Tipe untuk props ...Section
type PostsSectionProps = {
  posts: BlogPost[];
};

const FeaturedPostsSection: React.FC<PostsSectionProps> = ({ posts }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <TrendingUp className="h-6 w-6 text-blue-600" />
      Artikel Unggulan
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post) => <BlogPostCard key={post.id} post={post} isFeatured={true} />)}
    </div>
  </div>
);

type AllPostsSectionProps = {
  posts: BlogPost[];
  category: string;
}

const AllPostsSection: React.FC<AllPostsSectionProps> = ({ posts, category }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <BookOpen className="h-6 w-6 text-gray-600" />
      {category === 'All' ? 'Semua Artikel' : `Artikel ${category}`}
      <span className="text-sm font-normal text-gray-500">({posts.length} artikel)</span>
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post) => <BlogPostCard key={post.id} post={post} />)}
    </div>
  </div>
);

const RecentPostsWidget: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Posts</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {blogPosts.slice(0, 3).map((post) => (
          <div key={post.id} className="flex items-center gap-3">
            {/* Thumbnail gambar */}
            <img
              src={post.image}
              alt={post.title}
              className="w-16 h-16 rounded object-cover bg-gray-200"
            />
            <div>
              <h4 className="font-medium text-sm line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);


const PopularTagsWidget: React.FC = () => (
  <Card>
    <CardHeader><CardTitle className="text-lg">Tag Populer</CardTitle></CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => (
          <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-blue-100 hover:text-blue-700">{tag}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const NewsletterWidget: React.FC = () => (
  <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
    <CardHeader>
      <CardTitle className="text-lg text-center">Newsletter</CardTitle>
      <CardDescription className="text-center">Dapatkan artikel terbaru langsung di inbox Anda</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <Input placeholder="Email address" type="email" />
      <Button className="w-full">Subscribe</Button>
    </CardContent>
  </Card>
);

type SidebarProps = {
  recentPosts: BlogPost[];
}

const Sidebar: React.FC<SidebarProps> = ({ recentPosts }) => (
  <aside className="space-y-6">
    <RecentPostsWidget posts={recentPosts} />
    <PopularTagsWidget />
    <NewsletterWidget />
  </aside>
);


// --- KOMPONEN UTAMA HALAMAN ---

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 5);
  const shouldShowFeatured: boolean = selectedCategory === 'All' && searchTerm === '';

  return (
    <LandingPageLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <BlogHeader />

          <SearchAndFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Konten Utama */}
            <main className="lg:col-span-3 space-y-8">
              {shouldShowFeatured && <FeaturedPostsSection posts={featuredPosts} />}
              <AllPostsSection posts={filteredPosts} category={selectedCategory} />
            </main>

            {/* Sidebar */}
            <Sidebar recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default BlogPage;