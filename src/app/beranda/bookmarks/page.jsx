"use client";
import { useState } from "react";
import {
  Bookmark,
  BookOpen,
  Trash2,
  Search,
  ChevronRight,
  MoreVertical,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavbarUser";

const bookmarkedBooks = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
    cover: "https://via.placeholder.com/120x180/3B82F6/FFFFFF?text=LP",
    description:
      "Kisah inspiratif tentang perjuangan sekelompok anak di Belitung untuk mendapatkan pendidikan yang layak.",
    dateAdded: "15 Jun 2025",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Pengembangan Diri",
    cover: "https://via.placeholder.com/120x180/10B981/FFFFFF?text=AH",
    description:
      "Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk dengan pendekatan ilmiah.",
    dateAdded: "12 Jun 2025",
  },
  {
    id: 3,
    title: "Ensiklopedia Dunia",
    author: "Tim Editor",
    category: "Referensi",
    cover: "https://via.placeholder.com/120x180/8B5CF6/FFFFFF?text=ED",
    description:
      "Kumpulan pengetahuan lengkap tentang berbagai aspek dunia, dari sejarah hingga ilmu pengetahuan modern.",
    dateAdded: "8 Jun 2025",
  },
  {
    id: 4,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    category: "Filsafat",
    cover: "https://via.placeholder.com/120x180/EF4444/FFFFFF?text=FT",
    description:
      "Pengenalan filosofi stoisisme yang diterapkan dalam kehidupan modern untuk ketenangan pikiran.",
    dateAdded: "5 Jun 2025",
  },
];

export default function Bookmarks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState(bookmarkedBooks);
  const [activeFilter, setActiveFilter] = useState("semua");
  const [selectedBook, setSelectedBook] = useState(null);

  const categories = [
    "semua",
    "fiksi",
    "pengembangan diri",
    "referensi",
    "filsafat",
  ];

  const filteredBookmarks = bookmarks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "semua") return matchesSearch;
    return matchesSearch && book.category.toLowerCase() === activeFilter;
  });

  const handleRemoveBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarks(bookmarks.filter((book) => book.id !== id));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Buku yang Dibookmark
          </motion.h1>
          <p className="text-gray-600">
            Koleksi buku favorit Anda yang disimpan untuk dibaca nanti
          </p>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Cari buku, penulis, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black bg-white text-gray-900 placeholder-gray-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                    activeFilter === category
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {bookmarks.length}
            </div>
            <div className="text-gray-600">Total Bookmark</div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {bookmarks.filter((b) => b.category === "Fiksi").length}
            </div>
            <div className="text-gray-600">Buku Fiksi</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {bookmarks.filter((b) => b.category !== "Fiksi").length}
            </div>
            <div className="text-gray-600">Buku Non-Fiksi</div>
          </div>
        </motion.div>

        {/* Bookmarks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Koleksi Bookmark Anda
            </h2>
            <div className="text-sm text-gray-600">
              {filteredBookmarks.length} buku ditemukan
            </div>
          </div>

          {filteredBookmarks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16 text-gray-400"
            >
              <Bookmark className="h-16 w-16 mb-4" />
              <p className="text-lg mb-1">Tidak ada buku yang ditemukan</p>
              <p className="text-sm">
                Coba kata kunci lain atau filter berbeda
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <AnimatePresence>
                {filteredBookmarks.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleViewBook(book)}
                    className="group bg-gray-50 rounded-lg shadow-sm border border-gray-200 cursor-pointer overflow-hidden transition-all hover:shadow-md"
                  >
                    <div className="relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={(e) => handleRemoveBookmark(book.id, e)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label={`Hapus bookmark ${book.title}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                        {book.category}
                      </div>
                    </div>

                    <div className="p-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors truncate">
                          {book.title}
                        </h3>
                        <Bookmark className="h-5 w-5 text-yellow-400" />
                      </div>

                      <p className="text-sm text-gray-600 truncate">
                        Oleh: {book.author}
                      </p>

                      <div className="flex items-center mt-3">
                        <span className="text-xs text-gray-500 flex items-center">
                          Ditambahkan: {book.dateAdded}
                        </span>
                      </div>

                      <button
                        onClick={() => handleViewBook(book)}
                        className="mt-4 w-full text-xs font-medium text-black hover:text-gray-700 bg-gray-100 py-2 rounded-lg transition-colors"
                      >
                        Lihat detail{" "}
                        <ChevronRight className="h-4 w-4 ml-1 inline" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
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
                        <Bookmark className="h-4 w-4 mr-1" />
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
                      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center">
                        Pinjam Sekarang
                      </button>
                      <button
                        onClick={(e) =>
                          handleRemoveBookmark(selectedBook.id, e)
                        }
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Hapus Bookmark
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
