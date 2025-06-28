"use client";
import { useState } from "react";
import { BookOpen, Search, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavbarUser";

const catalogBooks = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    available: true,
    image: "/placeholder/laskar-pelangi.jpg",
    description:
      "Sebuah kisah inspiratif tentang perjuangan anak-anak di Belitong.",
    category: "Fiksi",
  },
  {
    id: 2,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    available: false,
    image: "/placeholder/filosofi-teras.jpg",
    description: "Panduan hidup berdasarkan filsafat Stoik dari Yunani kuno.",
    category: "Non-Fiksi",
  },
  {
    id: 3,
    title: "Harry Potter dan Batu Bertuah",
    author: "J.K. Rowling",
    available: true,
    image: "/placeholder/harry-potter.jpg",
    description: "Petualangan ajaib Harry Potter di sekolah sihir Hogwarts.",
    category: "Fiksi",
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    available: false,
    image: "/placeholder/atomic-habits.jpg",
    description: "Cara membangun kebiasaan kecil yang mengubah hidup.",
    category: "Non-Fiksi",
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    available: true,
    image: "/placeholder/dune.jpg",
    description:
      "Epik fiksi ilmiah tentang politik dan ekologi di planet Arrakis.",
    category: "Sains",
  },
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Fiksi");

  const filteredBooks = catalogBooks.filter(
    (book) =>
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeTab === "Semua" || book.category === activeTab)
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
          <p className="text-gray-600">Jelajahi koleksi buku kami</p>
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
            {["Semua", "Fiksi", "Non-Fiksi", "Sains"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Catalog Books Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400"
              >
                <BookOpen className="h-16 w-16 mb-4" />
                <p className="text-lg mb-1">Tidak ada buku yang ditemukan</p>
                <p className="text-sm">Coba kata kunci lain</p>
              </motion.div>
            ) : (
              filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          book.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.available ? "Tersedia" : "Dipinjam"}
                      </span>
                      {book.available && (
                        <Bookmark className="h-4 w-4 text-yellow-500 cursor-pointer" />
                      )}
                    </div>
                    <button
                      className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
                        book.available
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!book.available}
                    >
                      Pinjam
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
