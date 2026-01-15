import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, scaleUp } from "@/utils/animations";

interface CtaContent {
  heading?: string | null;
  description?: string | null;
  button_label?: string | null;
  button_link?: string | null;
}

interface FinalCTAProps {
  content?: CtaContent;
}

export function FinalCTA({ content }: FinalCTAProps) {
  const heading = content?.heading ?? 'Hubungi kami';
  const description = content?.description ?? 'Tambahkan teks CTA melalui dashboard.';
  const buttonLabel = content?.button_label ?? 'Kontak kami';
  const buttonLink = content?.button_link ?? '/contact';

  return (
    <motion.section
      id="contact-cta"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-14 shadow-xl sm:py-16"
    >
      {/* Modern Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -left-20 -top-20 h-72 w-72 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 animate-pulse rounded-full bg-purple-500/15 blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/3 top-1/2 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
      </div>

      <motion.div
        className="relative z-10 container mx-auto flex max-w-4xl flex-col items-center px-4 text-center"
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl drop-shadow-md"
        >
          {heading}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-2xl text-base text-indigo-100 sm:text-lg leading-relaxed"
        >
          {description}
        </motion.p>

        {buttonLabel && (
          <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="default"
              className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-indigo-700 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300"
            >
              <a href={buttonLink}>
                {buttonLabel}
              </a>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
