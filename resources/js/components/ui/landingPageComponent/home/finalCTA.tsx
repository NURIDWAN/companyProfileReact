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
      className="relative w-full overflow-hidden rounded-[2.5rem] bg-indigo-900 py-16 shadow-2xl sm:py-24 lg:py-28"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <motion.div
        className="relative z-10 container mx-auto flex max-w-4xl flex-col items-center px-4 text-center"
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-md"
        >
          {heading}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-lg font-medium text-indigo-100 sm:text-xl lg:mb-12 leading-relaxed"
        >
          {description}
        </motion.p>

        {buttonLabel && (
          <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-white px-8 text-lg font-bold text-indigo-700 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-gray-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300"
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
