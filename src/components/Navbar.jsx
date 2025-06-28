"use client";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simplified navItems structure
const navItems = [
  { label: "Beranda", href: "#", isActive: true },
  { label: "Tentang Kami", href: "#" },
  { label: "Fitur Utama", href: "#" },
  { label: "Langganan", href: "#" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial state on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-500 ${
        isScrolled ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${
                isScrolled ? "text-emerald-600" : "text-white"
              }`}
            >
              Litera
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? item.isActive
                      ? "text-emerald-600"
                      : "text-gray-700 hover:text-emerald-600"
                    : item.isActive
                    ? "text-emerald-400"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side - Desktop Login + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Desktop Login Button */}
            <button
              className={`hidden md:flex items-center px-4 py-2 rounded-lg transition-colors ${
                isScrolled
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-white hover:bg-gray-100 text-emerald-600"
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
              className={`md:hidden transition-colors duration-500 ${
                isScrolled
                  ? "text-gray-600 hover:text-emerald-600"
                  : "text-white hover:text-emerald-400"
              }`}
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
            className="fixed top-0 left-0 h-screen w-64 sm:w-72 bg-white shadow-lg z-50 border-r border-gray-200"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold text-emerald-600">Litera</h1>
                <button
                  onClick={toggleMenu}
                  aria-label="Tutup Menu"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col space-y-2">
                {navItems.map(({ label, href, isActive }) => (
                  <a
                    key={label}
                    href={href}
                    className={`block px-4 py-3 rounded-md duration-300 ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : "text-gray-700 hover:bg-emerald-100"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              {/* Login Button in Sidebar */}
              <button className="w-full mt-8 flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <User className="h-4 w-4 mr-2" />
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
