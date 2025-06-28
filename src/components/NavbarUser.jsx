"use client";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    category: "Beranda",
    items: [
      // user
      // { label: "Beranda", href: "/beranda" },
      // { label: "Inbox", href: "/beranda/inbox" },
      // { label: "Bookmarks", href: "/beranda/bookmarks" },
      // { label: "Peminjaman", href: "/Beranda/dipinjam" },
      // admin
      { label: "Dasbor Admin", href: "/admin/dasbor" },
      { label: "Inbox Admin", href: "/admin/inbox" },
      { label: "Katalog", href: "/admin/katalog" },
    ],
  },
  // {
  //   category: "Daftar Buku",
  //   items: [
  // general admin & users can acces this link
  //     { label: "Nonfiksi", href: "/listbuku/nonfiksi" },
  //     { label: "Fiksi", href: "/listbuku/fiksi" },
  //     { label: "Kurikulum", href: "/listbuku/kurikulum" },
  //     { label: "Ensiklopedia", href: "/listbuku/ensiklopedia" },
  //   ],
  // },
  {
    category: "Pengaturan",
    // user
    items: [
      // user
      // { label: "Profile", href: "/" },
      // { label: "Pengaturan", href: "/" },
      // admin
      { label: "Data Buku", href: "/admin/pengaturan/databuku" },
      { label: "Akun Pengguna", href: "/admin/pengaturan/akunpengguna" },
      { label: "Profile Admin", href: "/admin/pengaturan/profile" },
      { label: "Pesan", href: "/admin/  pesan" },
      { label: "Pengaturan Admin", href: "/admin/pengaturan" },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-black">Litera</h1>
          </div>

          {/* Right Side - Account Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Account Actions */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-dashed" />
                <button
                  onClick={toggleLogin}
                  className="flex items-center text-sm font-medium px-3 py-1 rounded-lg transition-colors text-gray-700 hover:text-black"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={toggleLogin}
                className="hidden md:flex items-center px-4 py-2 rounded-lg transition-colors bg-black text-white hover:bg-gray-800"
              >
                <User className="h-4 w-4 mr-2" />
                Masuk
              </button>
            )}

            {/* Menu Button - Always visible */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
              className="text-gray-600 hover:text-black transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-full max-w-xs bg-white shadow-lg z-50 border-r border-gray-200"
          >
            <div className="h-full flex flex-col">
              <div className="px-4 py-6 flex-1">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-xl font-bold text-black">Litera</h1>
                  <button
                    onClick={toggleMenu}
                    aria-label="Tutup Menu"
                    className="text-gray-600 hover:text-black"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col space-y-4 mb-8">
                  {navItems.map(({ category, items }) => (
                    <div key={category} className="flex flex-col">
                      <h2 className=" py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        {category}
                      </h2>
                      {items.map(({ label, href }) => (
                        <a
                          key={label}
                          href={href}
                          onClick={toggleMenu}
                          className="block px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Account Section */}
              <div className="border-t border-gray-200 p-4">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed mr-3" />
                      <div>
                        <p className="font-medium">Nama Pengguna</p>
                        <p className="text-sm text-gray-500">user@email.com</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleLogin}
                      className="flex items-center text-gray-700 hover:text-black transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={toggleLogin}
                    className="w-full flex items-center justify-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
