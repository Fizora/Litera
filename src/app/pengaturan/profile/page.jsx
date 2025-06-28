"use client";
import Navbar from "@/components/NavbarUser";
import { useState } from "react";
import { Camera, Edit, LogOut, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Rina Santoso",
    email: "rina.santoso@email.com",
    bio: "Pemimpi yang suka membaca dan belajar hal baru.",
    profileImage: "https://via.placeholder.com/150/000000/FFFFFF?text=Rina",
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", user);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-md"
              />
              <button
                onClick={() => console.log("Change profile picture")}
                className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {user.name}
            </h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
            >
              <Edit className="h-5 w-5 mr-2" />
              {isEditing ? "Batal" : "Edit Profil"}
            </button>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              ) : (
                <p className="text-lg text-gray-900">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              ) : (
                <p className="text-lg text-gray-900 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-500" />
                  {user.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black h-24 resize-none"
                />
              ) : (
                <p className="text-gray-600">{user.bio}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Simpan
                </button>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={() => console.log("Logout initiated")}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Keluar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
