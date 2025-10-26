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
      className="w-full rounded-3xl bg-blue-600"
    >
      <motion.div
        className="container mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16"
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          {heading}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-2xl text-lg font-normal text-blue-100 lg:mb-12"
        >
          {description}
        </motion.p>
        {buttonLabel && (
          <motion.div variants={scaleUp}>
            <Button asChild size="lg" variant="secondary" className="text-blue-600 hover:bg-gray-200">
              <a href={buttonLink}>{buttonLabel}</a>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
