import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { containerVariants, itemVariants, scaleUp } from "@/utils/animations";
import { motion } from "framer-motion";
import { Clock, Mail, Phone } from "lucide-react";

type CTAButton = {
  label?: string | null;
  href?: string | null;
};

type CTAContact = {
  icon?: "phone" | "mail" | "clock" | string | null;
  title?: string | null;
  detail?: string | null;
};

type CTASectionProps = {
  badge?: string | null;
  heading?: string | null;
  description?: string | null;
  primaryButton?: CTAButton;
  secondaryButton?: CTAButton;
  contacts?: CTAContact[];
};

const contactIcons = {
  phone: Phone,
  mail: Mail,
  clock: Clock,
} satisfies Record<string, typeof Phone>;

const defaultHeading = "Butuh Solusi yang Disesuaikan?";
const defaultDescription =
  "Jika Anda tidak menemukan yang Anda cari, tim kami siap membantu membangun solusi custom yang dirancang khusus untuk kebutuhan bisnis Anda.";

export default function CTASection({
  badge,
  heading,
  description,
  primaryButton,
  secondaryButton,
  contacts = [],
}: CTASectionProps) {
  const visibleContacts = contacts.filter(
    (contact) => contact?.title || contact?.detail
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="space-y-6"
    >
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="space-y-6 p-8 text-center">
          {badge ? (
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
            >
              {badge}
            </motion.span>
          ) : null}

          <motion.h2
            className="text-2xl font-bold md:text-3xl"
            variants={itemVariants}
          >
            {heading ?? defaultHeading}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-blue-100"
            variants={itemVariants}
          >
            {description ?? defaultDescription}
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={scaleUp}
          >
            {primaryButton?.label ? (
              <Button asChild variant="secondary" size="lg">
                <a href={primaryButton.href ?? "#"}>
                  {primaryButton.label}
                </a>
              </Button>
            ) : null}
            {secondaryButton?.label ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/60 text-white hover:bg-white/10"
              >
                <a href={secondaryButton.href ?? "#"}>
                  {secondaryButton.label}
                </a>
              </Button>
            ) : null}
          </motion.div>
        </CardContent>
      </Card>

      {visibleContacts.length ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-4 md:grid-cols-3"
        >
          {visibleContacts.map((contact, index) => {
            const key = contact.icon?.toLowerCase() ?? "phone";
            const Icon = contactIcons[key] ?? contactIcons.phone;

            return (
              <motion.div
                key={`cta-contact-${index}`}
                variants={itemVariants}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-white p-4 shadow-sm dark:bg-gray-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {contact.title}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {contact.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : null}
    </motion.section>
  );
}
