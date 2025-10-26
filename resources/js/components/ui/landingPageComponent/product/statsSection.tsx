import { Card } from "@/components/ui/card";
import { Package, Users, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

interface StatsProps {
  productsCount: number;
  totalClients: number;
  averageRating: string;
  awards: number;
}

export const StatsSection: React.FC<StatsProps> = ({
  productsCount,
  totalClients,
  averageRating,
  awards,
}) => (
  <motion.div
    className="grid grid-cols-2 md:grid-cols-4 gap-6"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    <motion.div variants={itemVariants}>
    <Card className="text-center p-6">
      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
        <Package className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{productsCount}+</h3>
      <p className="text-sm text-gray-600">Produk Unggulan</p>
    </Card>
    </motion.div>
    <motion.div variants={itemVariants}>
    <Card className="text-center p-6">
      <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
        <Users className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{totalClients}+</h3>
      <p className="text-sm text-gray-600">Klien Puas</p>
    </Card>
    </motion.div>
    <motion.div variants={itemVariants}>
    <Card className="text-center p-6">
      <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
        <Star className="h-6 w-6 text-purple-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{averageRating}</h3>
      <p className="text-sm text-gray-600">Rating Rata-rata</p>
    </Card>
    </motion.div>
    <motion.div variants={itemVariants}>
    <Card className="text-center p-6">
      <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
        <Award className="h-6 w-6 text-orange-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{awards}+</h3>
      <p className="text-sm text-gray-600">Penghargaan</p>
    </Card>
    </motion.div>
  </motion.div>
);
