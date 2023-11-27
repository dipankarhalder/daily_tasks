import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});
export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => {
  return UserModel.find();
};
export const getUserById = (id: string) => {
  return UserModel.findById(id);
};
export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};
export const getUserByPhone = (phone: string) => {
  return UserModel.findOne({ phone });
};
export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({ "authentication.sessionToken": sessionToken });
};
export const createUser = (values: Record<string, any>) => {
  return new UserModel(values).save().then((user) => user.toObject());
};
export const updateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, values);
};
export const deleteUserById = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id });
};
