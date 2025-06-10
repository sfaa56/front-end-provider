"use client"
import React, { useRef, useState } from "react";

function AdminProfilePage() {
  // Dummy admin data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "admin@yourdomain.com",
    role: "Administrator",
    phone: "+966 555 123 456",
    avatar: "",
    language: "English",
    notifications: true,
  });

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [activityLog] = useState([
    { action: "Logged in", date: "2024-06-09 10:00" },
    { action: "Changed settings", date: "2024-06-08 18:22" },
    { action: "Exported report", date: "2024-06-07 14:10" },
  ]);



    const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle avatar change
  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const avatarUrl = ev.target?.result as string;
        setProfile((p) => ({ ...p, avatar: avatarUrl }));
        setForm((f) => ({ ...f, avatar: avatarUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setEdit(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy: just close modal
    setShowChangePassword(false);
    setPasswords({ old: "", new: "", confirm: "" });
    alert("Password changed (dummy)");
  };

  return (
    <div className=" mx-6 p-8 bg-white rounded-xl shadow mb-10">
      
        <h1 className="text-gray-600 font-semibold text-xl font-sans  mb-6">
          Admin Profile
        </h1>
    

      {/* Basic Info */}
       <div className="flex flex-row items-center mb-6 gap-6">
        <div
          className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 mb-2 cursor-pointer hover:ring-2 hover:ring-secondary transition"
          title="Click to change avatar"
          onClick={handleAvatarClick}
        >
          {profile.avatar ? (
            <img src={profile.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            profile.name[0]
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="flex flex-col">        <div className="text-lg font-semibold">{profile.name}</div>
        <div className="text-gray-500">{profile.role}</div></div>

      </div>
      <div className="space-y-8">
        {/* Basic Info Section */}
        <section>
          <h2 className="font-semibold mb-2 text-secondary">Basic Info</h2>
          {edit ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium ">Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Language</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                >
                  <option value="English">English</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={form.notifications}
                  onChange={e => setForm(f => ({ ...f, notifications: e.target.checked }))}
                  className="accent-secondary w-5 h-5"
                />
                <label>Enable notifications</label>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 ">
              <div className="flex">
                <span className="font-medium w-[115px]">Name</span> {profile.name}
              </div>
              <div className="flex">
                <span className="font-medium w-[115px]">Email</span> {profile.email}
              </div>
              <div className="flex">
                <span className="font-medium w-[115px]">Phone</span> {profile.phone}
              </div>
              <div className="flex">
                <span className="font-medium w-[115px]">Role</span> {profile.role}
              </div>
              <div className="flex">
                <span className="font-medium w-[115px]">Language</span> {profile.language}
              </div>
              <div className="flex mb-10">
                <span className="font-medium w-[115px]">Notifications</span>{" "}
                {profile.notifications ? "Enabled" : "Disabled"}
              </div>
              <div className="flex gap-3 ">
                <button
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </section>
        {/* Change Password Section */}
        {showChangePassword && (
          <section className="border-t pt-6">
            <h2 className="font-semibold mb-2 text-secondary">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Old Password</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="old"
                  type={showPassword ? "text" : "password"}
                  value={passwords.old}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">New Password</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="new"
                  type={showPassword ? "text" : "password"}
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Confirm New Password</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((v) => !v)}
                  className="accent-secondary w-5 h-5"
                  id="showPass"
                />
                <label htmlFor="showPass">Show Passwords</label>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
                >
                  Save Password
                </button>
              </div>
            </form>
          </section>
        )}
        {/* Preferences Section */}
        <section className="border-t pt-6">
          <h2 className="font-semibold mb-2 text-secondary">Preferences</h2>
          <div>
            <span className="font-medium">Language:</span> {profile.language}
          </div>
          <div>
            <span className="font-medium">Notifications:</span>{" "}
            {profile.notifications ? "Enabled" : "Disabled"}
          </div>
        </section>
        {/* 2FA Section */}
        <section className="border-t pt-6">
          <h2 className="font-semibold mb-2 text-secondary">Two-Factor Authentication</h2>
          <div>
            <span className="font-medium">Status:</span>{" "}
            <span className="text-green-600">Enabled</span> {/* Dummy */}
          </div>
          <button
            className="mt-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => setShow2FA((v) => !v)}
          >
            {show2FA ? "Hide 2FA Details" : "Show 2FA Details"}
          </button>
          {show2FA && (
            <div className="mt-2 text-sm text-gray-600">
              2FA is enabled for your account. For extra security, use your authenticator app when logging in.
            </div>
          )}
        </section>
        {/* Activity Log Section */}
        <section className="border-t pt-6">
          <h2 className="font-semibold mb-2 text-secondary">Activity Log</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {activityLog.map((log, i) => (
              <li key={i}>
                <span className="font-medium">{log.action}</span> — {log.date}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AdminProfilePage;