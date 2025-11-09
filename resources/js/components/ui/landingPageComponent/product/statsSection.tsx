import { Card } from "@/components/ui/card";
import { Award, Package, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

type StatIcon = "package" | "users" | "star" | "award";

interface StatItem {
  icon: StatIcon;
  value: string;
  label: string;
}

interface StatsProps {
  items: StatItem[];
}

const iconThemes: Record<
  StatIcon,
  { bg: string; text: string; Icon: typeof Package }
> = {
  package: { bg: "bg-blue-100", text: "text-blue-600", Icon: Package },
  users: { bg: "bg-green-100", text: "text-green-600", Icon: Users },
  star: { bg: "bg-purple-100", text: "text-purple-600", Icon: Star },
  award: { bg: "bg-orange-100", text: "text-orange-600", Icon: Award },
};

export const StatsSection: React.FC<StatsProps> = ({ items }) => (
  <motion.div
    className="grid grid-cols-2 gap-6 md:grid-cols-4"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    {items.map((item, index) => {
      const theme = iconThemes[item.icon] ?? iconThemes.package;
      const Icon = theme.Icon;

      return (
        <motion.div key={`stat-${index}`} variants={itemVariants}>
          <Card className="p-6 text-center">
            <div
              className={`${theme.bg} mb-4 flex h-12 w-12 items-center justify-center rounded-lg`}
            >
              <Icon className={`h-6 w-6 ${theme.text}`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </p>
          </Card>
        </motion.div>
      );
    })}
  </motion.div>
);
