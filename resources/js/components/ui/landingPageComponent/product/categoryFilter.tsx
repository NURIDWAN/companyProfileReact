import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

interface Props {
  categories: Category[];
  selectedCategory: Category;
  onSelect: (cat: Category) => void;
}

export const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => (
  <motion.div
    className="flex flex-wrap gap-2 justify-center"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    {categories.map((category) => (
      <motion.div key={category} variants={itemVariants} whileHover={{ scale: 1.05 }}>
        <Button
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelect(category)}
          size="sm"
        >
          {category}
        </Button>
      </motion.div>
    ))}
  </motion.div>
);
