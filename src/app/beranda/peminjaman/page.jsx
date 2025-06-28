"use client";
import { useState } from "react";
import {
  BookOpen,
  Clock,
  Search,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavbarUser";

const borrowedBooks = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    borrowDate: "20 Jun 2025",
    dueDate: "30 Jun 2025",
    status: "Dipinjam",
    cover: "https://via.placeholder.com/80x120/3B82F6/FFFFFF?text=LP",
    daysLeft: 4,
  },
  {
    id: 2,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    borrowDate: "15 Jun 2025",
    dueDate: "25 Jun 2025",
    status: "Jatuh Tempo",
    cover: "https://via.placeholder.com/80x120/EF4444/FFFFFF?text=FT",
    daysOverdue: 2,
  },
  {
    id: 3,
    title: "Harry Potter dan Batu Bertuah",
    author: "J.K. Rowling",
    borrowDate: "22 Jun 2025",
    dueDate: "2 Jul 2025",
    status: "Dipinjam",
    cover: "https://via.placeholder.com/80x120/10B981/FFFFFF?text=HP",
    daysLeft: 6,
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    borrowDate: "18 Jun 2025",
    dueDate: "28 Jun 2025",
    status: "Dipinjam",
    cover: "https://via.placeholder.com/80x120/8B5CF6/FFFFFF?text=AH",
    daysLeft: 2,
  },
];

export default function BorrowedBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("semua");

  const filters = [
    { id: "semua", label: "Semua" },
    { id: "dipinjam", label: "Dipinjam" },
    { id: "jatuh-tempo", label: "Jatuh Tempo" },
  ];

  const filteredBooks = borrowedBooks.filter(
    (book) =>
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeFilter === "semua" ||
        (activeFilter === "dipinjam" && book.status === "Dipinjam") ||
        (activeFilter === "jatuh-tempo" && book.status === "Jatuh Tempo"))
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
            Buku yang Dipinjam
          </motion.h1>
          <p className="text-gray-600">
            Lihat dan kelola semua buku yang sedang Anda pinjam
          </p>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari buku atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black bg-white text-gray-700 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>

          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
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
              {borrowedBooks.length}
            </div>
            <div className="text-gray-600">Total Buku Dipinjam</div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {borrowedBooks.filter((b) => b.status === "Dipinjam").length}
            </div>
            <div className="text-gray-600">Sedang Dipinjam</div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {borrowedBooks.filter((b) => b.status === "Jatuh Tempo").length}
            </div>
            <div className="text-gray-600">Jatuh Tempo</div>
          </div>
        </motion.div>

        {/* Borrowed Books List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-1">
            {filteredBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 text-gray-400"
              >
                <BookOpen className="h-16 w-16 mb-4" />
                <p className="text-lg mb-1">Tidak ada buku yang ditemukan</p>
                <p className="text-sm">
                  Coba kata kunci lain atau filter berbeda
                </p>
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
                    className="flex p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-16 h-24 object-cover rounded-md shadow-sm"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {book.title}
                        </h3>
                        <button className="text-gray-500 hover:text-gray-700 ml-2">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {book.author}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <div className="text-gray-500">Tanggal Pinjam</div>
                            <div className="text-gray-900">
                              {book.borrowDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <div>
                            <div className="text-gray-500">Jatuh Tempo</div>
                            <div className="text-gray-900">{book.dueDate}</div>
                          </div>
                        </div>

                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              book.status === "Dipinjam"
                                ? "bg-gray-50 text-gray-900"
                                : "bg-gray-50 text-gray-900"
                            }`}
                          >
                            {book.status}
                          </span>

                          {book.status === "Dipinjam" && book.daysLeft && (
                            <div className="mt-1 text-xs text-gray-500">
                              {book.daysLeft} hari lagi
                            </div>
                          )}

                          {book.status === "Jatuh Tempo" &&
                            book.daysOverdue && (
                              <div className="mt-1 text-xs text-gray-500">
                                Terlambat {book.daysOverdue} hari
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <button className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center">
            Pinjam Buku Baru
          </button>
          <button className="px-5 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center">
            Lihat Riwayat Peminjaman
          </button>
        </motion.div>
      </div>
    </div>
  );
}
