import mongoose from 'mongoose';

const subNumbersSchema = new mongoose.Schema({
  retailer: String,
  country: String,
  phone: String,
  numtype: String,
});
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  record: [subNumbersSchema],
  email: { type: String },
});
export const ContactModel = mongoose.model(
  'Contact',
  ContactSchema
);
