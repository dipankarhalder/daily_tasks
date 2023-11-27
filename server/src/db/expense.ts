import mongoose from 'mongoose';

const subExpSchema = new mongoose.Schema({
  expTask: String,
  expPrice: String,
});
const ExpSchema = new mongoose.Schema({
  expDate: { type: String, required: true },
  expRecord: [subExpSchema],
});
export const ExpModel = mongoose.model('Expense', ExpSchema);

export const getExpenses = () => {
  return ExpModel.find();
};
export const getExpenseById = (id: string) => {
  return ExpModel.findById(id);
};
export const createExpense = (values: Record<string, any>) => {
  return new ExpModel(values).save().then((expense) => expense.toObject());
};
export const updateExpenseById = (id: string, values: Record<string, any>) => {
  return ExpModel.findByIdAndUpdate(id, values);
};
export const deleteExpenseById = (id: string) => {
  return ExpModel.findOneAndDelete({ _id: id });
};
