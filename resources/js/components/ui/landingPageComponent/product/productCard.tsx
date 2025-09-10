import React from "react";
import { Product } from "@/types";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="flex flex-col rounded-2xl border p-4 shadow-md hover:shadow-lg transition">
      {/* Thumbnail / Image */}
      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Content */}
      <CardHeader className="mt-3 p-0">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <span className="mt-1 inline-block text-sm text-gray-500">
          {product.category}
        </span>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between p-0">
        {/* Deskripsi */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Rating + Clients */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
          <span>{product.clients} Clients</span>
        </div>

        {/* Features */}
        {product.features && (
          <ul className="mt-2 flex flex-wrap gap-1 text-xs text-gray-500">
            {product.features.slice(0, 3).map((f, idx) => (
              <li
                key={idx}
                className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium"
              >
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-4 flex gap-2">
          {product.demo && (
            <Button
              size="sm"
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Lihat Demo
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-lg"
          >
            Detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
