import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section id="contact-cta" className="w-full bg-blue-600">
      <div className="container mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Siap Mengambil Langkah Selanjutnya?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg font-normal text-blue-100 lg:mb-12">
          Mari diskusikan bagaimana kami dapat membantu mewujudkan tujuan bisnis Anda. Hubungi kami hari ini untuk konsultasi gratis.
        </p>
        <Button size="lg" variant="secondary" className="text-blue-600 hover:bg-gray-200">
          Hubungi Kami Sekarang
        </Button>
      </div>
    </section>
  );
}