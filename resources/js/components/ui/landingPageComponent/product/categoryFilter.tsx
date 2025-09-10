import { Button } from "@/components/ui/button";
import { Category } from "@/types";

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
  <div className="flex flex-wrap gap-2 justify-center">
    {categories.map((category) => (
      <Button
        key={category}
        variant={selectedCategory === category ? "default" : "outline"}
        onClick={() => onSelect(category)}
        size="sm"
      >
        {category}
      </Button>
    ))}
  </div>
);
