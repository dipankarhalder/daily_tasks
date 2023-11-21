import mongoose from "mongoose";

const subNumbersSchema = new mongoose.Schema({
  title: String,
  country: String,
  phone: String,
});
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: [subNumbersSchema],
  notype: { type: String, required: true },
  email: { type: String, },
});
export const ContactModel = mongoose.model('Contact', ContactSchema);

export const getContacts = () => {
  return ContactModel.find();
}
export const getContactById = (id: string) => {
  return ContactModel.findById(id);
}
export const getContactByPhone = (phone: string) => {
  return ContactModel.findOne({ phone });
}
export const createContact = (values: Record<string, any>) => {
  return new ContactModel(values).save().then((contact) => contact.toObject());
}
export const updateContactById = (id: string, values: Record<string, any>) => {
  return ContactModel.findByIdAndUpdate(id, values);
}
export const deleteContactById = (id: string) => {
  return ContactModel.findOneAndDelete({ _id: id });
}