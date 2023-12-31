import mongoose from 'mongoose';

const subExpSchema = new mongoose.Schema({
  expTask: String,
  expPrice: String,
});
const ExpSchema = new mongoose.Schema({
  expDate: { type: String, required: true },
  expRecord: [subExpSchema],
});
export const ExpenseModel = mongoose.model(
  'Expense',
  ExpSchema
);
