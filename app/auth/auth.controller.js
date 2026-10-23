import { User } from "./auth.model.js";

const Create = async (data) => {
  const user = await User.create(data);
  return user;
};

const FindOne = async (data) => {
  let user = await User.findOne(data);
  return user;
};

const FindById = async (data) => {
  const user = await User.findById(data).select("-password");
  return user
};

const FindByIdUpdated = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data).select("-password");
  return user
};
export default {
  Create,
  FindOne,
  FindById,
  FindByIdUpdated
};
