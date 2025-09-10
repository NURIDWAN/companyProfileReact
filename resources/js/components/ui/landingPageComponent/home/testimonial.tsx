// src/components/Testimonial.jsx
import { Star, User, Quote, Users, TrendingUp, Handshake } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Data testimoni
const testimonialsData = [
  {
    rating: 5,
    quote: "Tim Digital Solusi Nusantara berhasil mengembangkan sistem ERP yang sangat membantu operasional perusahaan kami. Mereka profesional, responsif, dan selalu memberikan solusi terbaik. Highly recommended!",
    name: "Budi Santoso",
    title: "CEO",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop", // Ganti dengan URL gambar avatar
  },
  {
    rating: 5,
    quote: "Website dan aplikasi mobile yang dikembangkan sangat membantu bisnis kami berkembang pesat. User experience yang luar biasa dan performa yang optimal. Terima kasih atas kerja sama yang luar biasa!",
    name: "Sarah Wijaya",
    title: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2574&auto=format&fit=crop", // Ganti dengan URL gambar avatar
  },
  {
    rating: 5,
    quote: "Proses development yang transparan dan komunikasi yang sangat baik. Tim mereka benar-benar memahami kebutuhan bisnis kami dan memberikan solusi yang tepat sasaran.",
    name: "Ahmad Rahman",
    title: "IT Manager",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop", // Ganti dengan URL gambar avatar
  },
];

// Data metrik perusahaan
const metricsData = [
  { value: "100+", label: "Klien Puas", icon: <Users className="h-6 w-6 text-blue-500" /> },
  { value: "4.9/5", label: "Rating Client", icon: <Star className="h-6 w-6 text-yellow-500" /> },
  { value: "99%", label: "Satisfaction", icon: <TrendingUp className="h-6 w-6 text-green-500" /> },
];

export function Testimonial() {
  return (
    <section id="testimonials" className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-gray-400 mb-2">&quot; Testimoni Klien &quot;</p>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Kata Mereka
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Kepuasan dan kepercayaan klien adalah prioritas utama kami. Berikut adalah testimoni dari klien-klien yang telah merasakan layanan terbaik kami
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="relative p-6 shadow-md border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transform transition-transform duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gray-200 dark:text-gray-700 absolute top-4 right-4" />
              </div>
              <CardContent className="p-0 text-left mb-6">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  <Quote className="h-4 w-4 inline-block -mt-1 mr-1 text-gray-400 dark:text-gray-600" />
                  {testimonial.quote}
                  <Quote className="h-4 w-4 inline-block -mt-1 ml-1 text-gray-400 dark:text-gray-600 rotate-180" />
                </p>
              </CardContent>
              <div className="flex items-center mt-auto">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Metrics Section */}
        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8">
          {metricsData.map((metric, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                {metric.icon}
                <p className="text-4xl font-bold ml-2 text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <p className="text-sm text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}