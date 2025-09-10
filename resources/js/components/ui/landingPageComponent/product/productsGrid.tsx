import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./productCard";

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
