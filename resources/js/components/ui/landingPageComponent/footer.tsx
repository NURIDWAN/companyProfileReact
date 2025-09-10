import { Link } from '@inertiajs/react';
import { MountainIcon, Linkedin, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Kolom Branding dan Kontak */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-2">
                <MountainIcon className="h-7 w-7 text-white" />
                <span className="text-xl font-bold text-white">NamaPerusahaan</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-400">
              Menyediakan solusi inovatif untuk membantu bisnis Anda bertumbuh dan sukses di dunia digital.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Kolom Link Navigasi */}
          <div>
            <p className="font-semibold text-white">Perusahaan</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link href="/careers" className="hover:text-white">Karir</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Layanan</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/services/consulting" className="hover:text-white">Konsultasi</Link></li>
              <li><Link href="/services/marketing" className="hover:text-white">Pemasaran</Link></li>
              <li><Link href="/services/analytics" className="hover:text-white">Analisis</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Kontak</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:info@perusahaan.com" className="hover:text-white">info@perusahaan.com</a></li>
              <li><a href="tel:+62211234567" className="hover:text-white">+62 21 1234 567</a></li>
              <li className="text-gray-400">Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Garis Pemisah dan Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-400">
              © {currentYear} NamaPerusahaan. Seluruh hak cipta dilindungi.
            </p>
            <p className="mt-4 text-sm text-gray-400 sm:mt-0">
              <Link href="/privacy-policy" className="hover:text-white">Kebijakan Privasi</Link> | 
              <Link href="/terms-of-service" className="ml-2 hover:text-white">Ketentuan Layanan</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}