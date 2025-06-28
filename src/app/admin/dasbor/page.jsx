"use client";

import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Clock,
  Star,
  User,
  Search,
  ChevronRight,
  MoreHorizontal,
  X,
  Bookmark,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavbarUser";
import Chart from "chart.js/auto";

const cardIndexes = [
  {
    title: "Katalog Buku",
    description: "Jelajahi koleksi buku lengkap kami",
    icon: BookOpen,
    href: "/catalog",
  },
  {
    title: "Peminjaman",
    description: "Lihat status peminjaman Anda",
    icon: Clock,
    href: "/borrowing",
  },
  {
    title: "Favorit",
    description: "Akses buku favorit Anda",
    icon: Star,
    href: "/favorites",
  },
  {
    title: "Akun",
    description: "Selami profil dan pengaturan",
    icon: User,
    href: "/account",
  },
];

const borrowingHistory = [
  {
    id: 1,
    book: "Laskar Pelangi",
    author: "Andrea Hirata",
    date: "27 Jun 2025",
    status: "Dipinjam",
    dueDate: "4 Jul 2025",
    cover: "https://via.placeholder.com/80x120",
  },
  {
    id: 2,
    book: "Filosofi Teras",
    author: "Henry Manampiring",
    date: "25 Jun 2025",
    status: "Dikembalikan",
    dueDate: "2 Jul 2025",
    cover: "https://via.placeholder.com/80x120",
  },
  {
    id: 3,
    book: "Harry Potter",
    author: "J.K. Rowling",
    date: "23 Jun 2025",
    status: "Dipinjam",
    dueDate: "30 Jun 2025",
    cover: "https://via.placeholder.com/80x120",
  },
];

const recommendedBooks = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
    borrows: 120,
    cover: "https://via.placeholder.com/100x150",
    description:
      "Kisah inspiratif tentang perjuangan sekelompok anak di Belitung untuk mendapatkan pendidikan yang layak.",
    dateAdded: "28 Jun 2025",
    available: true,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Nonfiksi",
    borrows: 95,
    cover: "https://via.placeholder.com/100x150",
    description:
      "Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk dengan pendekatan ilmiah.",
    dateAdded: "28 Jun 2025",
    available: false,
  },
  {
    id: 3,
    title: "Ensiklopedia Dunia",
    author: "Tim Penulis",
    category: "Ensiklopedia",
    borrows: 80,
    cover: "https://via.placeholder.com/100x150",
    description:
      "Kumpulan pengetahuan lengkap tentang berbagai aspek dunia, dari sejarah hingga ilmu pengetahuan modern.",
    dateAdded: "28 Jun 2025",
    available: true,
  },
  {
    id: 4,
    title: "Matematika SMA",
    author: "Kementerian Pendidikan",
    category: "Kurikulum",
    borrows: 65,
    cover: "https://via.placeholder.com/100x150",
    description:
      "Materi pembelajaran matematika untuk siswa SMA dengan pendekatan yang mudah dipahami.",
    dateAdded: "28 Jun 2025",
    available: false,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [timeFilter, setTimeFilter] = useState("daily");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const categories = [
    "Semua",
    "Fiksi",
    "Nonfiksi",
    "Kurikulum",
    "Ensiklopedia",
  ];

  const filteredBooks =
    selectedCategory === "Semua"
      ? recommendedBooks
      : recommendedBooks.filter((book) => book.category === selectedCategory);

  const handleViewBook = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  // Mock borrowing data for the chart
  const getBorrowingData = () => {
    const categories = ["Fiksi", "Nonfiksi", "Kurikulum", "Ensiklopedia"];
    const baseData = {
      daily: [50, 30, 20, 10],
      weekly: [200, 150, 100, 80],
      monthly: [800, 600, 400, 300],
    };

    return {
      labels: categories,
      datasets: [
        {
          label: "Jumlah Peminjaman",
          data: baseData[timeFilter],
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: getBorrowingData(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Jumlah Peminjaman",
              },
            },
            x: {
              title: {
                display: true,
                text: "Kategori",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [timeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Selamat Datang di Perpustakaan Litera
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl">
                Temukan buku favorit Anda dan jelajahi dunia pengetahuan
              </p>
            </div>

            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari buku, penulis, atau kategori..."
                className="w-full md:w-80 pl-10 pr-4 py-3 rounded-lg bg-white/90 focus:bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart, Quick Actions, and History */}
          <div className="lg:col-span-2 space-y-8">
            {/* Borrowing Index Chart */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Indeks Peminjaman
                </h2>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black text-gray-700"
                >
                  <option value="daily">Harian</option>
                  <option value="weekly">Mingguan</option>
                  <option value="monthly">Bulanan</option>
                </select>
              </div>
              <div className="h-64">
                <canvas ref={chartRef} />
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Akses Cepat</h2>
                <button className="text-sm text-black hover:text-gray-700 flex items-center">
                  Lihat semua <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cardIndexes.map(
                  ({ title, description, icon: Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      className="group bg-gray-50 rounded-lg p-5 transition-all hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                          <Icon className="h-6 w-6 text-black group-hover:text-gray-700" />
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                          {title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {description}
                        </p>
                      </div>
                    </a>
                  )
                )}
              </div>
            </section>

            {/* Borrowing History */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Riwayat Peminjaman Terkini
                </h2>
                <button className="text-sm text-black hover:text-gray-700 flex items-center">
                  Lihat semua <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              <div className="space-y-4">
                {borrowingHistory.map(
                  ({ id, book, author, date, status, dueDate, cover }) => (
                    <div
                      key={id}
                      className="flex p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={cover}
                          alt={book}
                          className="w-16 h-24 object-cover rounded-md shadow-sm"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{book}</h3>
                        <p className="text-sm text-gray-600 mb-1">{author}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{date}</span>
                          </div>

                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              status === "Dipinjam"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {status}
                          </div>

                          {status === "Dipinjam" && (
                            <div className="text-sm text-gray-600">
                              Jatuh tempo: {dueDate}
                            </div>
                          )}
                        </div>
                      </div>

                      <button className="self-start text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          {/* Right Column - Recommendations */}
          <div>
            {/* Book Recommendations */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Rekomendasi Buku
                </h2>
                <button className="text-sm text-black hover:text-gray-700 flex items-center">
                  Lihat semua <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                {filteredBooks.map(
                  (
                    {
                      id,
                      title,
                      author,
                      category,
                      borrows,
                      cover,
                      description,
                      dateAdded,
                      available,
                    },
                    index
                  ) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                      onClick={() =>
                        handleViewBook({
                          id,
                          title,
                          author,
                          category,
                          borrows,
                          cover,
                          description,
                          dateAdded,
                          available,
                        })
                      }
                    >
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <img
                          src={cover}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
                          {title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{author}</p>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                          {description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {available ? "Tersedia" : "Dipinjam"}
                          </span>
                          {available && (
                            <Bookmark className="h-4 w-4 text-yellow-500 cursor-pointer" />
                          )}
                        </div>
                        <button
                          className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
                            available
                              ? "bg-black text-white hover:bg-gray-800"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={!available}
                        >
                          Pinjam
                        </button>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={handleCloseDetail}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedBook.title}
                    </h2>
                    <p className="text-gray-600">Oleh: {selectedBook.author}</p>
                  </div>
                  <button
                    onClick={handleCloseDetail}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={selectedBook.cover}
                      alt={selectedBook.title}
                      className="w-48 h-72 object-cover rounded-lg shadow-md mx-auto"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-50 text-gray-900 rounded-full text-sm">
                        {selectedBook.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-50 text-gray-900 rounded-full text-sm flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Ditambahkan: {selectedBook.dateAdded}
                      </span>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-2">
                      Deskripsi Buku
                    </h3>
                    <p className="text-gray-700 mb-6">
                      {selectedBook.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedBook.available
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!selectedBook.available}
                      >
                        Pinjam Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
