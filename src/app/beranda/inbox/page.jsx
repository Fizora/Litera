"use client";
import { useState } from "react";
import {
  Mail,
  Trash2,
  Archive,
  ChevronLeft,
  Reply,
  MoreVertical,
  Filter,
  RefreshCw,
  Menu,
  Search,
  CheckSquare,
  BookOpen,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavbarUser";

const messages = [
  {
    id: 1,
    sender: "Perpustakaan Litera",
    senderEmail: "notifikasi@litera.ac.id",
    subject: "Pengingat: Pengembalian Buku",
    date: "27 Jun 2025, 10:49 PM WIB",
    time: "Sekarang",
    status: "Belum Dibaca",
    content:
      "Buku 'Laskar Pelangi' yang Anda pinjam akan jatuh tempo pada 30 Jun 2025. Mohon untuk mengembalikan buku tepat waktu untuk menghindari denda keterlambatan sebesar Rp 5.000 per hari.",
    important: true,
    type: "pengingat",
  },
  {
    id: 2,
    sender: "Sistem Peminjaman",
    senderEmail: "noreply@librarysystem.id",
    subject: "Konfirmasi Peminjaman",
    date: "26 Jun 2025, 14:30 WIB",
    time: "1 hari lalu",
    status: "Dibaca",
    content:
      "Peminjaman buku 'Filosofi Teras' telah berhasil diproses. Buku dapat diambil di perpustakaan mulai besok. Masa pinjam adalah 7 hari.",
    important: false,
    type: "konfirmasi",
  },
  {
    id: 3,
    sender: "Admin Perpustakaan",
    senderEmail: "admin@litera.ac.id",
    subject: "Pemberitahuan Koleksi Baru",
    date: "25 Jun 2025, 10:15 WIB",
    time: "2 hari lalu",
    status: "Belum Dibaca",
    content:
      "Kami telah menambahkan koleksi baru di kategori Ensiklopedia. Silakan kunjungi perpustakaan untuk melihat koleksi terbaru kami: Ensiklopedia Dunia Kuno, Ensiklopedia Flora & Fauna, dan Ensiklopedia Teknologi Modern.",
    important: false,
    type: "pemberitahuan",
  },
  {
    id: 4,
    sender: "Tim Litera",
    senderEmail: "tim@litera.ac.id",
    subject: "Pembaruan Sistem Perpustakaan",
    date: "24 Jun 2025, 16:45 WIB",
    time: "3 hari lalu",
    status: "Dibaca",
    content:
      "Kami ingin memberitahukan bahwa akan ada pemeliharaan sistem pada hari Sabtu, 28 Juni 2025 pukul 00:00-04:00 WIB. Layanan peminjaman online tidak akan tersedia selama periode tersebut.",
    important: true,
    type: "pembaruan",
  },
  {
    id: 5,
    sender: "Manajemen Perpustakaan",
    senderEmail: "manajemen@litera.ac.id",
    subject: "Peringatan: Keterlambatan Pengembalian",
    date: "23 Jun 2025, 11:20 WIB",
    time: "4 hari lalu",
    status: "Belum Dibaca",
    content:
      "Buku 'Atomic Habits' yang Anda pinjam telah melewati batas waktu pengembalian. Mohon segera mengembalikan buku untuk menghindari akumulasi denda. Denda saat ini: Rp 15.000.",
    important: true,
    type: "peringatan",
  },
];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setIsMenuOpen(false); // Close mobile menu when selecting a message
    if (message.status === "Belum Dibaca") {
      const updatedMessages = messages.map((msg) =>
        msg.id === message.id ? { ...msg, status: "Dibaca" } : msg
      );
      console.log(
        "Message marked as read:",
        updatedMessages.find((msg) => msg.id === message.id)
      );
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    console.log(`Delete message with id: ${id}`);
  };

  const handleArchive = (id, e) => {
    e.stopPropagation();
    console.log(`Archive message with id: ${id}`);
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "belum-dibaca")
      return matchesSearch && message.status === "Belum Dibaca";
    if (activeTab === "penting") return matchesSearch && message.important;
    return matchesSearch;
  });

  const getIconForType = (type) => {
    switch (type) {
      case "pengingat":
        return <Clock className="h-4 w-4 text-black" />;
      case "konfirmasi":
        return <CheckSquare className="h-4 w-4 text-black" />;
      case "peringatan":
        return <AlertTriangle className="h-4 w-4 text-black" />;
      case "pemberitahuan":
        return <BookOpen className="h-4 w-4 text-black" />;
      default:
        return <Mail className="h-4 w-4 text-black" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
        {/* Header with Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-full hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Buka menu filter"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Kotak Masuk
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {messages.filter((m) => m.status === "Belum Dibaca").length}{" "}
                belum dibaca
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pesan..."
                className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu (Mobile/Tablet) */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6"
              >
                <div className="space-y-2">
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                      activeTab === "semua"
                        ? "bg-gray-50 text-black"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveTab("semua")}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Semua Pesan
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                      activeTab === "belum-dibaca"
                        ? "bg-gray-50 text-black"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveTab("belum-dibaca")}
                  >
                    <span className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-black text-xs mr-2">
                      {
                        messages.filter((m) => m.status === "Belum Dibaca")
                          .length
                      }
                    </span>
                    Belum Dibaca
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                      activeTab === "penting"
                        ? "bg-gray-50 text-black"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveTab("penting")}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Penting
                  </button>
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
              Filter Pesan
            </h2>
            <div className="space-y-2">
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                  activeTab === "semua"
                    ? "bg-gray-50 text-black"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("semua")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Semua Pesan
              </button>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                  activeTab === "belum-dibaca"
                    ? "bg-gray-50 text-black"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("belum-dibaca")}
              >
                <span className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-black text-xs mr-2">
                  {messages.filter((m) => m.status === "Belum Dibaca").length}
                </span>
                Belum Dibaca
              </button>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium ${
                  activeTab === "penting"
                    ? "bg-gray-50 text-black"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("penting")}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Penting
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-4">
                <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-1"></div>
                  <div className="col-span-3">Pengirim</div>
                  <div className="col-span-5">Subjek</div>
                  <div className="col-span-2 text-right">Waktu</div>
                  <div className="col-span-1"></div>
                </div>
                <AnimatePresence>
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map(
                      ({
                        id,
                        sender,
                        subject,
                        date,
                        time,
                        status,
                        important,
                        type,
                      }) => (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          onClick={() =>
                            handleSelectMessage(
                              messages.find((msg) => msg.id === id)
                            )
                          }
                          className={`
                            lg:grid lg:grid-cols-12 gap-4 items-center p-4 border-b border-gray-100 cursor-pointer transition-colors
                            ${
                              selectedMessage?.id === id
                                ? "bg-gray-50"
                                : "hover:bg-gray-100"
                            }
                            ${status === "Belum Dibaca" ? "font-medium" : ""}
                          `}
                        >
                          <div className="col-span-1 flex items-center lg:items-start">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black">
                              {getIconForType(type)}
                            </div>
                          </div>
                          <div className="col-span-3">
                            <h3
                              className={`truncate ${
                                status === "Belum Dibaca"
                                  ? "text-gray-900 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {sender}
                            </h3>
                          </div>
                          <div className="col-span-5 flex items-center">
                            <p
                              className={`truncate ${
                                status === "Belum Dibaca"
                                  ? "text-gray-900 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {subject}
                            </p>
                            {important && (
                              <span className="ml-2 text-gray-500">
                                <AlertTriangle className="h-4 w-4" />
                              </span>
                            )}
                          </div>
                          <div className="col-span-2 text-right text-xs text-gray-500">
                            {time}
                          </div>
                          <div className="col-span-1 flex justify-end space-x-2 lg:space-x-1">
                            <button
                              onClick={(e) => handleArchive(id, e)}
                              className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 lg:block"
                              aria-label={`Arsipkan pesan ${subject}`}
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(id, e)}
                              className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:block"
                              aria-label={`Hapus pesan ${subject}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      )
                    )
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center py-16 text-gray-400"
                    >
                      <Mail className="h-16 w-16 mb-4" />
                      <p className="text-lg font-medium">
                        Tidak ada pesan yang ditemukan
                      </p>
                      <p className="text-sm mt-1">
                        Coba kata kunci lain atau filter berbeda
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Full-Screen Popup */}
          <AnimatePresence mode="wait">
            {selectedMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-white z-50 flex flex-col"
              >
                <div className="p-6 border-b border-gray-100">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="flex items-center text-sm font-medium text-black hover:text-gray-700"
                    aria-label="Kembali ke kotak masuk"
                  >
                    <ChevronLeft className="h-5 w-5 mr-1" /> Kembali
                  </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-black mr-3">
                          {getIconForType(selectedMessage.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {selectedMessage.sender}
                          </p>
                          <p className="text-sm text-gray-500">
                            Dari:{" "}
                            <span className="text-gray-700">
                              {selectedMessage.senderEmail}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            Kepada: <span className="text-gray-700">Saya</span>
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {selectedMessage.date}
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMessage.content}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      aria-label="Balas pesan"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Balas
                    </button>
                    <button
                      onClick={(e) => handleArchive(selectedMessage.id, e)}
                      className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label={`Arsipkan pesan ${selectedMessage.subject}`}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Arsipkan
                    </button>
                    <button
                      onClick={(e) => handleDelete(selectedMessage.id, e)}
                      className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label={`Hapus pesan ${selectedMessage.subject}`}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
