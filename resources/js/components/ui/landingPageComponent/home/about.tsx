import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, slideIn } from "@/utils/animations";

interface AboutContent {
  title?: string | null;
  description?: string | null;
  highlights?: string[];
  image_url?: string | null;
}

interface AboutProps {
  content?: AboutContent;
}

export function About({ content }: AboutProps) {
  const title = content?.title ?? 'Tentang Kami';
  const description = content?.description ?? 'Tambahkan narasi perusahaan melalui dashboard.';
  const highlights = content?.highlights ?? [];
  const imageUrl = content?.image_url;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="rounded-3xl bg-gray-50 py-16 px-4 dark:bg-gray-900"
    >
      <motion.div
        className="container mx-auto grid items-center gap-8 md:grid-cols-2"
        variants={containerVariants}
      >
        <motion.div
          className="space-y-6"
          variants={slideIn}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"
          >
            Sekilas
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed text-gray-600 dark:text-gray-400"
          >
            {description}
          </motion.p>

          {highlights.length ? (
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              variants={containerVariants}
            >
              {highlights.slice(0, 4).map((highlight) => (
                <motion.div
                  key={highlight}
                  variants={itemVariants}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{highlight}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <motion.div variants={itemVariants}>
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Selengkapnya
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {imageUrl && (
          <motion.div
            className="relative mt-8 md:mt-0"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="h-auto w-full rounded-xl object-cover shadow-lg"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
