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
      className="relative w-full overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 shadow-2xl sm:py-16 lg:py-20 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950"
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[70%] -translate-x-1/2 rounded-full bg-white/60 blur-3xl dark:bg-indigo-500/10" />
      <motion.div
        className="container relative mx-auto max-w-screen-xl px-4 text-center"
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl"
        >
          {heading}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-2xl text-lg font-normal text-gray-600 dark:text-gray-300 lg:mb-12"
        >
          {description}
        </motion.p>
        {buttonLabel && (
          <motion.div variants={scaleUp}>
            <Button
              asChild
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400"
            >
              <a href={buttonLink}>{buttonLabel}</a>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
