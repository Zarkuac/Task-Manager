import User from '../models/User.js';

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

export const getAllUsers = async () => {
  return await User.find();
};