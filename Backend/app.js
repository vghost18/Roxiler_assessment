import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Transaction from "./models/transaction.js"; 
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection setup
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

// API to seed database
app.get("/initialize-db", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    // Clear existing data and insert new records
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Database initialization error:", error);
    res.status(500).json({ error: "Database initialization failed" });
  }
});

// API to fetch transactions with search and pagination
app.get("/transactions", async (req, res) => {
  const { search = "", page = 1, perPage = 10 } = req.query;

  try {
    const filter = search
      ? {
          $or: [
            { title: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            { price: parseFloat(search) || null },
          ],
        }
      : {};

    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      data: transactions,
      total,
      page: Number(page),
      perPage: Number(perPage),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to retrieve transactions" });
  }
});

// API to fetch statistics
app.get("/statistics", async (req, res) => {
  const { month } = req.query;

  try {
    const matchCondition = month
      ? { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } }
      : {};

    const soldCount = await Transaction.countDocuments({
      ...matchCondition,
      sold: true,
    });

    const unsoldCount = await Transaction.countDocuments({
      ...matchCondition,
      sold: false,
    });

    const totalSales = await Transaction.aggregate([
      { $match: { ...matchCondition, sold: true } },
      { $group: { _id: null, totalAmount: { $sum: "$price" } } },
    ]);

    res.status(200).json({
      totalSaleAmount: totalSales.length > 0 ? totalSales[0].totalAmount : 0,
      soldItems: soldCount,
      notSoldItems: unsoldCount,
    });
  } catch (error) {
    console.error("Statistics fetch error:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// API for bar chart data
app.get("/bar-chart/:month", async (req, res) => {
  const { month } = req.params;

  try {
    const priceDistribution = await Transaction.aggregate([
      {
        $addFields: {
          saleMonth: { $month: { $toDate: "$dateOfSale" } },
        },
      },
      { $match: { saleMonth: Number(month) } },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.status(200).json(priceDistribution);
  } catch (error) {
    console.error("Error generating bar chart:", error);
    res.status(500).json({ error: "Failed to generate bar chart data" });
  }
});

// API for pie chart data
app.get("/pie-chart/:month", async (req, res) => {
  const { month } = req.params;

  try {
    const transactions = await Transaction.find();

    // Filter transactions for the given month
    const filteredTransactions = transactions.filter((txn) => {
      const saleDate = new Date(txn.dateOfSale);
      return saleDate.getMonth() === Number(month) - 1;
    });

    // Group by category
    const categoryCounts = filteredTransactions.reduce((counts, txn) => {
      counts[txn.category] = (counts[txn.category] || 0) + 1;
      return counts;
    }, {});

    const pieChartData = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      items: count,
    }));

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error("Pie chart fetch error:", error);
    res.status(500).json({ error: "Failed to fetch pie chart data" });
  }
});

// API for combined responses
app.get("/combined", async (req, res) => {
  const { month } = req.query;

  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      Transaction.find(),
      axios.get(`${req.protocol}://${req.get("host")}/statistics?month=${month}`),
      axios.get(`${req.protocol}://${req.get("host")}/bar-chart/${month}`),
      axios.get(`${req.protocol}://${req.get("host")}/pie-chart/${month}`),
    ]);

    res.status(200).json({
      transactions,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
