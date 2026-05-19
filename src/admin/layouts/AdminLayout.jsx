import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-950 text-white min-h-screen">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <AdminTopbar />
        {/* PAGE CONTENT */}
        <main className="p-6 bg-gray-900 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}