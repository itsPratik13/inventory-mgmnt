import type { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenses = await prisma.expenses.findMany({
      take: 15,
      orderBy: {
        amount: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expensebyCategoryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expensebyCategory = expensebyCategoryRaw.map((item: any) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.status(200).json({
      popularProducts,
      salesSummary,
      expenses,
      expenseSummary,
      purchaseSummary,
      expensebyCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving metrics" });
  }
};
