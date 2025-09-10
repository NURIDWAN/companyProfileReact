import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CTASection: React.FC = () => (
  <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
    <CardContent className="p-8 text-center space-y-4">
      <h2 className="text-2xl font-bold">Butuh Solusi yang Disesuaikan?</h2>
      <p className="text-blue-100 max-w-2xl mx-auto">
        Jika Anda tidak menemukan yang Anda cari, tim kami siap membantu
        membangun solusi custom yang dirancang khusus untuk kebutuhan bisnis
        Anda.
      </p>
      <Button variant="secondary" size="lg" className="mt-4">
        Hubungi Kami untuk Konsultasi Gratis
      </Button>
    </CardContent>
  </Card>
);
