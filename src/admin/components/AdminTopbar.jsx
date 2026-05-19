export default function Topbar() {
  return (
    <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-6">
      <input
        placeholder="Search..."
        className="bg-gray-800 px-3 py-2 rounded-md w-80 outline-none"
      />

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full" />
        <span>Admin</span>
      </div>
    </header>
  );
}