"use client";
import Navbar from "@/components/NavbarUser";
import { useState } from "react";
import { Book, Search, Filter, Menu, Star, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const books = [
  {
    id: 1,
    title: "Sapiens: Sejarah Singkat Umanusia",
    author: "Yuval Noah Harari",
    category: "Sejarah",
    published: "27 Jun 2014",
    updated: "27 Jun 2025, 11:35 PM WIB",
    highlighted: true,
    bookmarked: false,
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Sapiens",
  },
  {
    id: 2,
    title: "Faktor Mengejutkan di Balik Kesuksesan",
    author: "Malcolm Gladwell",
    category: "Psikologi",
    published: "27 Jun 2008",
    updated: "26 Jun 2025, 14:30 WIB",
    highlighted: false,
    bookmarked: true,
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Outliers",
  },
  {
    id: 3,
    title: "Keseimbangan Alam Semesta",
    author: "Stephen Hawking",
    category: "Sains",
    published: "27 Jun 1988",
    updated: "25 Jun 2025, 10:15 WIB",
    highlighted: true,
    bookmarked: false,
    cover:
      "https://via.placeholder.com/150x200/000000/FFFFFF?text=A+Brief+History",
  },
  {
    id: 4,
    title: "Hidupku: Autobiografi Soekarno",
    author: "Soekarno",
    category: "Biografi",
    published: "27 Jun 1965",
    updated: "24 Jun 2025, 16:45 WIB",
    highlighted: false,
    bookmarked: false,
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Soekarno",
  },
];

export default function NonFiksi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookmarks, setBookmarks] = useState(
    books.filter((book) => book.bookmarked).map((book) => book.id)
  );

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && book.category === selectedCategory;
  });

  const categories = ["all", "Sejarah", "Psikologi", "Sains", "Biografi"];

  const highlightedBooks = filteredBooks.filter((book) => book.highlighted);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const handleBorrow = (id) => {
    console.log(`Memulai proses peminjaman untuk buku dengan ID: ${id}`);
  };

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
                Buku Nonfiksi
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {books.length} buku tersedia
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari judul, penulis, atau kategori..."
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

        {/* Highlighted Books Section */}
        {highlightedBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Buku Terhighlight
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlightedBooks.map((book) => (
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
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        Terbit: {book.published}
                      </span>
                      <span className="text-gray-500">
                        Diperbarui: {book.updated}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-gray-900">
                      <Star className="h-4 w-4 mr-1" />
                      <span>Highlight</span>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleBorrow(book.id)}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Pinjam
                      </button>
                      <button
                        onClick={() => toggleBookmark(book.id)}
                        className="p-2 text-gray-600 hover:text-gray-900"
                        aria-label={`Tandai bookmark untuk ${book.title}`}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            bookmarks.includes(book.id)
                              ? "fill-gray-900 text-gray-900"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
                  Filter Kategori
                </h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                        selectedCategory === category
                          ? "bg-gray-50 text-gray-900"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <Book className="h-4 w-4 mr-2" />
                      {category === "all" ? "Semua Kategori" : category}
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
              Filter Kategori
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-gray-50 text-gray-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <Book className="h-4 w-4 mr-2" />
                  {category === "all" ? "Semua Kategori" : category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Book Listings */}
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
                            Terbit: {book.published}
                          </span>
                          <span className="text-gray-500">
                            Diperbarui: {book.updated}
                          </span>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <button
                            onClick={() => handleBorrow(book.id)}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            Pinjam
                          </button>
                          <button
                            onClick={() => toggleBookmark(book.id)}
                            className="p-2 text-gray-600 hover:text-gray-900"
                            aria-label={`Tandai bookmark untuk ${book.title}`}
                          >
                            <Bookmark
                              className={`h-5 w-5 ${
                                bookmarks.includes(book.id)
                                  ? "fill-gray-900 text-gray-900"
                                  : "text-gray-400"
                              }`}
                            />
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
