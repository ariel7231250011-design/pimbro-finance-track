import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const userId = user.id

  const thisMonth = new Date()
  thisMonth.setDate(1)

  const [income, expense] = await Promise.all([
    prisma.transaction.aggregate({
      where: { userId, type: "INCOME", date: { gte: thisMonth } },
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where: { userId, type: "EXPENSE", date: { gte: thisMonth } },
      _sum: { amount: true },
    }),
  ])

  const incomeAmount = Number(income._sum.amount ?? 0)
const expenseAmount = Number(expense._sum.amount ?? 0)

return NextResponse.json({
  income: incomeAmount,
  expense: expenseAmount,
  balance: incomeAmount - expenseAmount,
})
}
