import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone } from "lucide-react";
import { useAuth } from "@context/AuthContext";
import BackButton from "@components/ui/BackButton";

function PersonalInfo() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [newProfileFile, setNewProfileFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /* === دقیقا مثل TaskerList === */
  const resolveAvatar = (user) => {
    if (!user || !user.profile_picture) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User"
      )}&background=random&color=fff`;
    }

    return user.profile_picture.startsWith("http")
      ? user.profile_picture
      : `https://fixfy.liara.run/storage/${user.profile_picture}`;
  };

  /* === Load user data === */
  useEffect(() => {
    if (!user) return;

    setFullName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setProfileImagePreview(resolveAvatar(user));
  }, [user]);

  /* === Image handlers === */
  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewProfileFile(file);
    setProfileImagePreview(URL.createObjectURL(file)); // preview only
  };

  /* === Save === */
  const handleSaveChanges = async () => {
    if (!user) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("phone", phone || "");

    if (newProfileFile) {
      formData.append("profile_picture", newProfileFile);
    }

    try {
      const success = await updateProfile(formData);

      if (success) {
        setIsEditing(false);
        setNewProfileFile(null);
        setProfileImagePreview(resolveAvatar(user)); // reload from db
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    if (!user) return;

    setFullName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setProfileImagePreview(resolveAvatar(user));
    setNewProfileFile(null);
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <header className="relative mb-8 flex items-center">
          <BackButton />
          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
            Personal Info
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-12">
          <div>
            <h2 className="text-2xl font-bold">Profile Details</h2>
            <p className="mt-2 text-sm text-slate-600">
              Update your personal info and profile picture.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="p-6">
                {/* Photo */}
                <div className="pb-6 border-b">
                  <label className="block text-sm font-medium mb-2">Photo</label>
                  <div className="flex items-center gap-5">
                    <img
                      src={profileImagePreview}
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />

                    {isEditing && (
                      <button
                        onClick={handleImageClick}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold hover:bg-slate-200"
                      >
                        Change
                      </button>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-6 pt-6">
                  <Input icon={<User />} label="Full Name" value={fullName} disabled={!isEditing} onChange={setFullName} />
                  <Input icon={<Mail />} label="Email" value={email} disabled={!isEditing} onChange={setEmail} />
                  <Input icon={<Phone />} label="Phone" value={phone} disabled={!isEditing} onChange={setPhone} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
                {isEditing ? (
                  <>
                    <button onClick={handleCancel} className="rounded-lg bg-slate-200 px-4 py-2">
                      Cancel
                    </button>
                    <button onClick={handleSaveChanges} className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg bg-slate-800 px-4 py-2 text-white"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, disabled, icon }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border py-3 pl-10 pr-4"
        />
      </div>
    </div>
  );
}

export default PersonalInfo;
