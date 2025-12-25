"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <div>Loading...</div>
  if (!session) redirect("/auth/signin")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pimbro Finance Track</h1>
              <p className="text-gray-600">Halo, {session.user?.name}!</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Saldo Saat Ini</p>
              <p className="text-2xl font-bold text-green-600">Rp 15.750.000</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-10a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pendapatan Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-900">Rp 25.000.000</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 9H5l.05-2h11.9L16 13zm0-5.5l-.05.06A3.5 3.5 0 0012.563 9H8.437a3.5 3.5 0 00-3.392-2.44l.02-.06L5 7.5v1l.05-.06A3.5 3.5 0 008.437 7h4.126c1.066 0 2.022.58 2.532 1.44L15 8.5v-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pengeluaran Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-900">Rp 9.250.000</p>
              </div>
            </div>
          </div>

          {/* Tambah 2 card lagi: Gaji Belum Dibayar & Transaksi Terbaru */}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 00-1 1v6.586L5.293 7.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 9.586V3a1 1 0 00-1-1z"/>
              <path d="M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm2 0v8h10V8H5z"/>
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tambah Transaksi</h3>
            <p className="text-gray-500">Pendapatan / Pengeluaran</p>
          </button>
          
          {/* Tambah button: Kelola Karyawan & Lihat Laporan */}
        </div>
      </div>
    </div>
  )
}
