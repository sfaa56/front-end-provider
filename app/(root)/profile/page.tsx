"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { updateAdmin } from "@/features/auth/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function AdminProfilePage() {
  const { user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  // Dummy admin data
  const [profile, setProfile] = useState({
    id: user?._id,
    name: user?.name,
    email: user?.email,
    role: "Administrator",
    phoneNumber: user?.phoneNumber,
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        ...user,
      }));
      setForm((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateProfile = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name || form.name.trim().length < 3) {
      errs.name = "Name is required and must be at least 3 characters.";
    }
    if (
      !form.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
      !form.email.endsWith(".com")
    ) {
      errs.email = "A valid email is required.";
    }
    if (form.phoneNumber && !/^\+?\d{7,15}$/.test(form.phoneNumber)) {
      errs.phoneNumber = "Phone number is invalid.";
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProfile();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const resultAction = await dispatch(updateAdmin(form));

      if (updateAdmin.fulfilled.match(resultAction)) {
        const userupdated = resultAction.payload;
        console.log(" successful!");
        console.log("User data:", userupdated);
        setEdit(false);
      } else {
        console.log("error", error);
        //  Get error directly from resultAction
        if (resultAction.payload) {
          console.log("updated failed:", resultAction.payload); // e.g. { error: "Invalid credentials" }
          toast("something went wrong");
        }
      }
    } catch (error) {
      console.log("Unexpected error during login:", error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const validatePasswords = () => {
    const errs: { [key: string]: string } = {};
    if (!passwords.old) errs.old = "Old password required";
    if (!passwords.new || passwords.new.length < 6)
      errs.new = "New password must be at least 6 characters";
    if (passwords.new !== passwords.confirm)
      errs.confirm = "Passwords do not match";
    return errs;
  };

  const [passwordErrors, setPasswordErrors] = useState<{
    [key: string]: string;
  }>({});

  const handlePasswordSubmit = (e: React.FormEvent) => {
    // Dummy: just close modal
   
    e.preventDefault();
    const validationErrors = validatePasswords();
    if (Object.keys(validationErrors).length > 0) {
      setPasswordErrors(validationErrors);
      return;
    }
    setPasswordErrors({});
    setShowChangePassword(false);
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
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            profile?.name?.[0] ?? ""
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="flex flex-col">
          {" "}
          <div className="text-lg font-semibold">{profile.name}</div>
          <div className="text-gray-500">{profile.role}</div>
        </div>
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
                {errors.name && (
                  <span className="text-red-500 text-xs">{errors.name}</span>
                )}
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
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.phoneNumber}
                  </span>
                )}
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
                   
      disabled={loading}
                >
                     {loading ? <LoadingSpinner size={18} color="#fff" /> : "Save"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 ">
              <div className="flex">
                <span className="font-medium w-[115px]">Name</span>{" "}
                {profile.name}
              </div>
              <div className="flex">
                <span className="font-medium w-[115px]">Email</span>{" "}
                {profile.email}
              </div>
              <div className="flex">
                <span className="font-medium w-[115px]">Phone</span>{" "}
                {profile.phoneNumber}
              </div>
              <div className="flex">
                <span className="font-medium w-[115px]">Role</span>{" "}
                {profile.role}
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
            <h2 className="font-semibold mb-2 text-secondary">
              Change Password
            </h2>
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
                 {passwordErrors.old && <span className="text-red-500 text-xs">{passwordErrors.old}</span>}

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
                 {passwordErrors.new && <span className="text-red-500 text-xs">{passwordErrors.new}</span>}

              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Confirm New Password
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
                 {passwordErrors.confirm && <span className="text-red-500 text-xs">{passwordErrors.confirm}</span>}

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
