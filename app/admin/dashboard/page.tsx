export default function DashboardPage() {
  const stats = [
    {
      label: "Products",
      count: "125",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Categories",
      count: "12",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Users",
      count: "1,043",
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
        <p className="text-gray-500">Ringkasan statistik aplikasi Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-hover hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              {s.label}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div
                className={`w-12 h-12 ${s.bg} ${s.color} rounded-xl flex items-center justify-center font-bold text-xl`}
              >
                {s.count[0]}
              </div>
              <h3 className="text-3xl font-black text-gray-800">{s.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold">Siap Mengelola Data?</h2>
          <p className="text-gray-500 text-sm">
            Pilih menu di samping untuk mulai menambah produk baru atau melihat
            daftar pengguna terdaftar.
          </p>
        </div>
      </div>
    </div>
  );
}
