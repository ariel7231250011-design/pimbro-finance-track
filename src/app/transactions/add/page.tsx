"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddTransaction() {
  const [formData, setFormData] = useState({
    type: "INCOME" as "INCOME" | "EXPENSE",
    amount: "",
    description: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0]
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Tambah Transaksi</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Transaksi</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as "INCOME" | "EXPENSE" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="INCOME">Pendapatan</option>
            <option value="EXPENSE">Pengeluaran</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nominal (Rp)</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="1500000"
            required
          />
        </div>
        
        {/* Tambah field: description, category, date */}
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-rbfrom-green-500 to-green-600 text-white p-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
          >
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  )
}
