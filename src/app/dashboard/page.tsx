"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  // Redirect ke /auth/signin jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  // Saat unauthenticated, kita tunggu useEffect redirect berjalan
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-gray-600">Redirecting...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pimbro Finance Track</h1>
              <p className="text-gray-600">
                Halo, {session?.user?.name ?? session?.user?.email ?? "User"}!
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Saldo Saat Ini</p>
                <p className="text-2xl font-bold text-green-600">Rp 15.750.000</p>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Pendapatan */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 011-1h1a1 1 0 011 1v1h8V3a1 1 0 011-1h1a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pendapatan Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-900">Rp 25.000.000</p>
              </div>
            </div>
          </div>

          {/* Pengeluaran */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pengeluaran Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-900">Rp 9.250.000</p>
              </div>
            </div>
          </div>

          {/* Gaji belum dibayar */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5h2v6H9V5zm0 8h2v2H9v-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Gaji Belum Dibayar</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          {/* Transaksi hari ini */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v12H3V5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Transaksi Hari Ini</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => router.push("/transactions/add")}
            className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all text-center"
          >
            <div className="text-lg font-semibold text-gray-900 mb-2">Tambah Transaksi</div>
            <div className="text-gray-500">Pendapatan / Pengeluaran</div>
          </button>

          <button
            onClick={() => router.push("/employees")}
            className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all text-center"
          >
            <div className="text-lg font-semibold text-gray-900 mb-2">Kelola Karyawan</div>
            <div className="text-gray-500">Data & gaji</div>
          </button>

          <button
            onClick={() => router.push("/reports")}
            className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all text-center"
          >
            <div className="text-lg font-semibold text-gray-900 mb-2">Lihat Laporan</div>
            <div className="text-gray-500">Ringkasan pemasukan/pengeluaran</div>
          </button>
        </div>
      </div>
    </div>
  )
}
