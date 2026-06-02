export default function HistoryHeader() {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="px-5 pt-5 pb-3 text-center">
        {/* <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
          BimbelMelly
        </h1> */}
      </div>

      <div className="px-5 pb-4">
        <h2 className="font-bold text-gray-900">Riwayat Sesi</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Semua riwayat presensi dan payout
        </p>
      </div>
    </div>
  );
}