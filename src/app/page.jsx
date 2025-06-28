"use client";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Menu,
  X,
  Users,
  Clock,
  Search,
  ShieldCheck,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  Home,
  Briefcase,
  FileText,
  HelpCircle,
  Lock,
  Send,
} from "lucide-react";

export default function Lome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background-main text-primary-text overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-primary-50/20 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-primary-300" />
              <span className="text-2xl font-bold text-primary-text">
                BookTech
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="hover:text-primary-300 transition-colors"
              >
                Fitur
              </a>
              <a
                href="#about"
                className="hover:text-primary-300 transition-colors"
              >
                Tentang
              </a>
              <a
                href="#contact"
                className="hover:text-primary-300 transition-colors"
              >
                Kontak
              </a>
              <button className="px-6 py-2 bg-primary-300 hover:bg-primary-400 text-white rounded-full transition-colors flex items-center gap-1">
                Mulai Sekarang <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              className="md:hidden text-primary-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background-main border-t border-primary-50/10">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block hover:text-primary-300 transition-colors py-2 items-center gap-2"
              >
                <Home className="w-5 h-5" /> Fitur
              </a>
              <a
                href="#about"
                className="block hover:text-primary-300 transition-colors py-2 items-center gap-2"
              >
                <Briefcase className="w-5 h-5" /> Tentang
              </a>
              <a
                href="#contact"
                className="block hover:text-primary-300 transition-colors py-2 items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" /> Kontak
              </a>
              <button className="w-full bg-primary-300 hover:bg-primary-400 text-white px-6 py-2 rounded-full transition-colors flex items-center justify-center gap-2">
                Mulai Sekarang <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary-300/10 border border-primary-300/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary-300">
                Sistem Peminjaman Buku Digital
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Kelola Peminjaman Buku Sekolah{" "}
              <span className="text-primary-300">Lebih Mudah</span>
            </h1>

            <p className="text-lg text-primary-text/80 max-w-lg">
              Solusi digital untuk manajemen perpustakaan sekolah yang efisien,
              transparan, dan terintegrasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-primary-300 hover:bg-primary-400 text-white rounded-full font-medium transition-colors flex items-center gap-2">
                Coba Sekarang <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border border-primary-300 text-primary-300 hover:bg-primary-300/10 rounded-full font-medium transition-colors flex items-center gap-2">
                Pelajari Lebih Lanjut <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-primary-300/10 rounded-2xl p-8 backdrop-blur-sm border border-primary-300/20">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-primary-300 p-4 flex items-center justify-between">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> BookTech Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" /> Peminjaman Aktif
                        </span>
                        <span className="text-sm font-medium text-primary-300">
                          12
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <BookOpen className="w-4 h-4" /> Buku Tersedia
                        </span>
                        <p className="text-lg font-medium mt-1">1,245</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4" /> Anggota
                        </span>
                        <p className="text-lg font-medium mt-1">586</p>
                      </div>
                    </div>
                    <div className="bg-primary-300/10 rounded-lg p-4 border border-primary-300/20">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-primary-300" />
                        <div>
                          <p className="text-sm font-medium">
                            Peminjaman Hari Ini
                          </p>
                          <p className="text-xs text-gray-600">
                            8 buku dipinjam
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 w-64 h-64 rounded-full bg-primary-300/20 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-primary-50/5 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fitur Unggulan <span className="text-primary-300">BookTech</span>
            </h2>
            <p className="text-lg text-primary-text/80 max-w-2xl mx-auto">
              Solusi lengkap untuk manajemen perpustakaan sekolah yang modern
              dan efisien.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card-background rounded-xl p-8 border border-primary-50/10 hover:border-primary-300/30 transition-all duration-300">
              <div className="w-12 h-12 bg-primary-300/10 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-primary-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pencarian Cepat</h3>
              <p className="text-primary-text/80">
                Temukan buku dengan mudah menggunakan sistem pencarian canggih
                dengan filter lengkap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-primary-300/10 rounded-2xl p-6 backdrop-blur-sm border border-primary-300/20">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-primary-300 p-4 flex items-center justify-between">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Perpustakaan Modern
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center bg-gray-100 rounded-lg h-48">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Transformasi digital untuk perpustakaan sekolah
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 w-64 h-64 rounded-full bg-primary-300/20 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Tentang <span className="text-primary-300">BookTech</span>
            </h2>
            <p className="text-lg text-primary-text/80">
              BookTech adalah solusi inovatif untuk manajemen perpustakaan
              sekolah yang dikembangkan khusus untuk memenuhi kebutuhan
              pendidikan modern.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-primary-300/10 rounded-full flex items-center justify-center">
                    <Clock className="w-3 h-3 text-primary-300" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Efisiensi Waktu</h4>
                  <p className="text-primary-text/70 text-sm">
                    Proses peminjaman dan pengembalian buku yang cepat dan
                    akurat.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-primary-300/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-primary-300" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Transparansi</h4>
                  <p className="text-primary-text/70 text-sm">
                    Sistem pelacakan yang jelas untuk semua transaksi
                    peminjaman.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-primary-300/10 rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-primary-300" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Integrasi</h4>
                  <p className="text-primary-text/70 text-sm">
                    Terhubung dengan sistem informasi sekolah lainnya.
                  </p>
                </div>
              </div>
            </div>
            <button className="px-6 py-2 border border-primary-300 text-primary-300 hover:bg-primary-300/10 rounded-full font-medium transition-colors mt-4 inline-flex items-center gap-2">
              Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-300 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Mengubah Manajemen Perpustakaan Sekolah Anda?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Mulai gunakan BookTech hari ini dan rasakan kemudahan dalam
            mengelola peminjaman buku sekolah.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white hover:bg-gray-100 text-primary-300 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
              Daftar Sekarang <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 border border-white text-white hover:bg-white/10 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
              Jadwalkan Demo <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hubungi <span className="text-primary-300">Kami</span>
            </h2>
            <p className="text-lg text-primary-text/80 max-w-2xl mx-auto">
              Punya pertanyaan atau ingin mengetahui lebih lanjut? Tim kami siap
              membantu Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-primary-300/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-300" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <p className="text-primary-text/70">info@booktech.id</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-primary-300/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-300" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Telepon</h4>
                  <p className="text-primary-text/70">+62 21 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-primary-300/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-300" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Kantor</h4>
                  <p className="text-primary-text/70">
                    Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary-300 hover:bg-primary-400 text-white rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Kirim Pesan <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-50/5 py-12 px-4 sm:px-6 lg:px-8 border-t border-primary-50/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-primary-300" />
                <span className="text-xl font-bold text-primary-text">
                  BookTech
                </span>
              </div>
              <p className="text-primary-text/70 text-sm">
                Solusi digital untuk manajemen perpustakaan sekolah yang modern
                dan efisien.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Perusahaan
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Karir
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Produk
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Harga
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" /> Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-text/70 hover:text-primary-300 transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" /> Kebijakan Cookie
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-50/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-text/70 text-sm mb-4 md:mb-0">
              © 2023 BookTech. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-primary-text/70 hover:text-primary-300 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-text/70 hover:text-primary-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-text/70 hover:text-primary-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
