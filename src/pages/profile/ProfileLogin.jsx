import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Footer from "@components/layout/Footer";

function ProfileLoggedIn() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        User not found.
      </div>
    );
  }

  /* === منطق عکس مثل TaskerList === */
  const avatar = user.profile_picture
    ? user.profile_picture.startsWith("http")
      ? user.profile_picture
      : `https://fixfy.liara.run/storage/${user.profile_picture}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name || "User"
      )}&background=random&color=fff`;

  const menuItems = [
    { label: "Personal Info", path: "/PersonalInfo" },
    { label: "Account & Security", path: "/account-security" },
    { label: "Payment", path: "/payment" },
    { label: "Notifications", path: "/notification" },
    { label: "Help & Support", path: "/HelpandSupport" },
  ];

  return (
    <div className="bg-sky-100 min-h-screen pb-20">
      <div className="container mx-auto max-w-md md:max-w-3xl px-4">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        </header>

        <main className="pb-32">
          {/* User Info */}
          <div className="flex flex-col items-center pt-4 pb-8">
            <img
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              src={avatar}
              alt={user.name || "User Profile"}
            />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {user.name || "Welcome Back!"}
            </h2>
            <p className="text-base text-gray-600">{user.email}</p>
          </div>

          {/* Menu */}
          <div className="bg-white/60 rounded-xl p-3 space-y-1 shadow-md">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex justify-between p-3 rounded-lg hover:bg-gray-100"
              >
                <span>{item.label}</span>
                <span>›</span>
              </Link>
            ))}

            <button
              onClick={logout}
              className="w-full flex justify-between p-3 rounded-lg hover:bg-red-100 text-red-500"
            >
              Logout
              <span>›</span>
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default ProfileLoggedIn;
