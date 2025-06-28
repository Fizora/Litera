"use client";
import Navbar from "@/components/NavbarUser";
import { useState } from "react";
import { Book, Search, Filter, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const encyclopediaEntries = [
  {
    id: 1,
    title: "Hewan Mamalia",
    description: "Informasi tentang mamalia di dunia",
    category: "Hewan",
    updated: "26 Jun 2025, 13:00 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Mammals",
  },
  {
    id: 2,
    title: "Sejarah Dunia Kuno",
    description: "Ikhtisar sejarah peradaban kuno",
    category: "Sejarah",
    updated: "25 Jun 2025, 09:45 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Ancient",
  },
  {
    id: 3,
    title: "Kimia Dasar",
    description: "Pengantar prinsip kimia dasar",
    category: "Sains",
    updated: "27 Jun 2025, 10:30 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Chemistry",
  },
  {
    id: 4,
    title: "Budaya Asia",
    description: "Tinjauan budaya di wilayah Asia",
    category: "Budaya",
    updated: "24 Jun 2025, 15:15 WIB",
    cover: "https://via.placeholder.com/150x200/000000/FFFFFF?text=Asia",
  },
];

export default function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEntries = encyclopediaEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && entry.category === selectedCategory;
  });

  const categories = ["all", "Hewan", "Sejarah", "Sains", "Budaya"];

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
                Ensiklopedia
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {encyclopediaEntries.length} entri tersedia
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari judul, deskripsi, atau kategori..."
                className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <button
            className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
            aria-label="Filter ensiklopedia"
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

          {/* Encyclopedia Listings */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="p-2">
                        <img
                          src={entry.cover}
                          alt={entry.title}
                          className="w-full h-48 object-cover rounded-t-2xl"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {entry.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">
                            Kategori: {entry.category}
                          </span>
                          <span className="text-gray-500">
                            Diperbarui: {entry.updated}
                          </span>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() =>
                              console.log(`Memulai proses untuk ${entry.title}`)
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
                      Tidak ada entri yang ditemukan
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
