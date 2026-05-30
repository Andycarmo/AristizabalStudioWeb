import AdminLayout from "../layouts/AdminLayout";
import { Settings, User, Lock, Bell } from "lucide-react";

export default function SettingsPage() {

  return (
    <AdminLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PROFILE */}
        <div className="bg-gray-800 p-6 rounded-2xl">

          <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
            <User size={18} />
            Profile
          </h2>

          <input
            className="w-full bg-gray-900 p-3 rounded-xl mb-3 text-white"
            placeholder="Name"
          />

          <input
            className="w-full bg-gray-900 p-3 rounded-xl text-white"
            placeholder="Email"
          />

        </div>

        {/* SECURITY */}
        <div className="bg-gray-800 p-6 rounded-2xl">

          <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
            <Lock size={18} />
            Security
          </h2>

          <input
            className="w-full bg-gray-900 p-3 rounded-xl mb-3 text-white"
            placeholder="New Password"
            type="password"
          />

          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl">
            Update Password
          </button>

        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-gray-800 p-6 rounded-2xl md:col-span-2">

          <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
            <Bell size={18} />
            Notifications
          </h2>

          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" />
            Email notifications
          </label>

        </div>

      </div>

    </AdminLayout>
  );
}