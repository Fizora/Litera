"use client";
import Navbar from "@/components/NavbarUser";
import { useState } from "react";
import { Book, Search, Filter, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fictionBooks = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    genre: "Drama",
    updated: "26 Jun 2025, 14:00 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Laskar",
  },
  {
    id: 2,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasi",
    updated: "25 Jun 2025, 10:30 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=HP",
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasi",
    updated: "27 Jun 2025, 11:45 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Hobbit",
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Drama",
    updated: "24 Jun 2025, 16:00 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Mockingbird",
  },
];

export default function Fiction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");

  const filteredBooks = fictionBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedGenre === "all") return matchesSearch;
    return matchesSearch && book.genre === selectedGenre;
  });

  const genres = ["all", "Drama", "Fantasi"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header with Search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-full hover:bg-gray-200 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Buka menu filter"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Buku Fiksi
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {fictionBooks.length} buku tersedia
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari judul, penulis, atau genre..."
                className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <button
            className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
            aria-label="Filter buku"
          >
            <Filter className="h-5 w-5" />
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile/Tablet Filter Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Filter Genre
                </h2>
                <div className="space-y-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                        selectedGenre === genre
                          ? "bg-gray-50 text-gray-900"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      <Book className="h-4 w-4 mr-2" />
                      {genre === "all" ? "Semua Genre" : genre}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block w-64 bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Filter Genre
            </h2>
            <div className="space-y-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                    selectedGenre === genre
                      ? "bg-gray-50 text-gray-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  <Book className="h-4 w-4 mr-2" />
                  {genre === "all" ? "Semua Genre" : genre}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Fiction Listings */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="p-2">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-48 object-cover rounded-t-2xl"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {book.author}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">
                            Genre: {book.genre}
                          </span>
                          <span className="text-gray-500">
                            Diperbarui: {book.updated}
                          </span>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() =>
                              console.log(`Memulai proses untuk ${book.title}`)
                            }
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors w-full"
                          >
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400"
                  >
                    <Book className="h-16 w-16 mb-4" />
                    <p className="text-lg font-medium">
                      Tidak ada buku yang ditemukan
                    </p>
                    <p className="text-sm mt-1">
                      Coba kata kunci lain atau filter berbeda
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
