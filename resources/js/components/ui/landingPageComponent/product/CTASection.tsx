import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, scaleUp } from "@/utils/animations";

export const CTASection: React.FC = () => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="p-8 text-center space-y-4">
        <motion.h2 className="text-2xl font-bold" variants={itemVariants}>
          Butuh Solusi yang Disesuaikan?
        </motion.h2>
        <motion.p className="text-blue-100 max-w-2xl mx-auto" variants={itemVariants}>
          Jika Anda tidak menemukan yang Anda cari, tim kami siap membantu
          membangun solusi custom yang dirancang khusus untuk kebutuhan bisnis
          Anda.
        </motion.p>
        <motion.div variants={scaleUp}>
          <Button variant="secondary" size="lg" className="mt-4">
            Hubungi Kami untuk Konsultasi Gratis
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);
