"use client";
import { useState, useEffect } from "react";
import { Plus, Upload, Download, Filter, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/NavbarUser";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    available: true,
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books and categories
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("title", { ascending: true });
      if (error) {
        console.error("Error fetching books:", error);
        setBooks([]); // Ensure books is an empty array on error
      } else {
        setBooks(data || []);
      }

      const { data: catData } = await supabase
        .from("categories")
        .select("name");
      if (catData) setCategories(["All", ...catData.map((c) => c.name)]);
      else setCategories(["All"]); // Default to ["All"] if no categories
    };
    fetchBooks();
  }, []);

  // Add new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("books").insert([newBook]);
    if (error) console.error("Error adding book:", error);
    else {
      setBooks([...books, newBook]);
      setNewBook({
        title: "",
        author: "",
        category: "",
        available: true,
        description: "",
      });
      setIsModalOpen(false);
    }
  };

  // Upload CSV
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const rows = text.split("\n").slice(1); // Skip header
      const newBooks = rows
        .map((row) => {
          const [title, author, category, available, description] =
            row.split(",");
          return {
            title: title || "",
            author: author || "",
            category: category || "",
            available: available === "true",
            description: description || "",
          };
        })
        .filter((book) => book.title.trim()); // Filter out empty or invalid rows

      const { error } = await supabase.from("books").insert(newBooks);
      if (error) console.error("Error uploading books:", error);
      else {
        setBooks([...books, ...newBooks]);
        setFile(null);
      }
    };
    reader.readAsText(file);
  };

  // Export CSV
  const handleExport = () => {
    const headers = ["title,author,category,available,description"];
    const rows = books.map(
      (book) =>
        `${book.title || ""},${book.author || ""},${book.category || ""},${
          book.available
        },${book.description || ""}`
    );
    const csv = headers.concat(rows).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "books_export.csv";
    a.click();
  };

  // Filter by category and search
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      (book.title &&
        book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.author &&
        book.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Admin Buku
      </motion.h1>

      <Navbar />

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" /> Tambah Buku
        </button>
        <div className="flex gap-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="fileUpload"
          />
          <button
            onClick={() => document.getElementById("fileUpload").click()}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Upload className="h-5 w-5 mr-2" /> Unggah CSV
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" /> Ekspor CSV
          </button>
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari judul atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-black bg-white text-gray-700 placeholder-gray-400"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Penulis</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Tersedia</th>
              <th className="p-3 text-left">Deskripsi</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredBooks.map((book) => (
                <motion.tr
                  key={book.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{book.title || "N/A"}</td>
                  <td className="p-3">{book.author || "N/A"}</td>
                  <td className="p-3">{book.category || "N/A"}</td>
                  <td className="p-3">{book.available ? "Ya" : "Tidak"}</td>
                  <td className="p-3 line-clamp-2">
                    {book.description || "N/A"}
                  </td>
                  <td className="p-3">
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Book */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Tambah Buku Baru</h2>
              <form onSubmit={handleAddBook} className="space-y-4">
                <input
                  type="text"
                  placeholder="Judul"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Penulis"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <select
                  value={newBook.category}
                  onChange={(e) =>
                    setNewBook({ ...newBook, category: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
                <textarea
                  placeholder="Deskripsi"
                  value={newBook.description}
                  onChange={(e) =>
                    setNewBook({ ...newBook, description: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Upload Form */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-white rounded-lg shadow-md"
        >
          <form onSubmit={handleFileUpload} className="space-y-4">
            <p className="text-gray-700">File yang dipilih: {file.name}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFile(null)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Unggah
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
