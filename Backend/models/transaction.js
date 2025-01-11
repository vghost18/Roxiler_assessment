import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the transaction schema
const TransactionSchema = new Schema({
  transactionId: {
    type: Number,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isSold: {
    type: Boolean,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
});

// Create the model
const Transaction = mongoose.model("ProductTransaction", TransactionSchema);

export default Transaction;
