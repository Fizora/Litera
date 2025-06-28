"use client";
import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavbarUser";

const catalogBooks = [
  { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", available: true },
  {
    id: 2,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    available: false,
  },
  {
    id: 3,
    title: "Harry Potter dan Batu Bertuah",
    author: "J.K. Rowling",
    available: true,
  },
  { id: 4, title: "Atomic Habits", author: "James Clear", available: false },
  { id: 5, title: "Dune", author: "Frank Herbert", available: true },
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("semua");

  const filteredBooks = catalogBooks.filter(
    (book) =>
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeTab === "semua" ||
        (activeTab === "tersedia" && book.available) ||
        (activeTab === "dipinjam" && !book.available))
  );

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
            Katalog Buku
          </motion.h1>
          <p className="text-gray-600">
            Cari dan jelajahi koleksi buku yang tersedia
          </p>
        </div>

        {/* Search and Tab Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari judul atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black bg-white text-gray-700 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>

          <div className="flex space-x-2">
            {["semua", "tersedia", "dipinjam"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Catalog Books List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-4">
            {filteredBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 text-gray-400"
              >
                <BookOpen className="h-16 w-16 mb-4" />
                <p className="text-lg mb-1">Tidak ada buku yang ditemukan</p>
                <p className="text-sm">Coba kata kunci lain</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {filteredBooks.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-16 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {book.author}
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          book.available
                            ? "bg-gray-50 text-gray-900"
                            : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {book.available ? "Tersedia" : "Dipinjam"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <button className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center">
            Pinjam Buku
          </button>
        </motion.div>
      </div>
    </div>
  );
}
