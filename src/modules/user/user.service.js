const bcrypt = require("bcrypt");

const userRepository = require("./user.repository");

const getUsers = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Math.min(Number(query.limit) || 20, 100);
  const offset = (page - 1) * limit;

  let isActive;

  if (query.isActive !== undefined) {
    isActive = query.isActive === "true";
  }

  const result = await userRepository.getAllUsers({
    search: query.search,
    isActive,
    limit,
    offset,
  });

  return {
    users: result.rows,
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    },
  };
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const createUser = async (userData) => {
  const {
    name,
    email,
    password,
    roleIds,
    schoolIds,
  } = userData;

  const existingUser =
    await userRepository.getUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await userRepository.createUser(
    name,
    email,
    passwordHash
  );

  try {
    await userRepository.assignRoles(
      user.id,
      roleIds
    );

    await userRepository.assignSchools(
      user.id,
      schoolIds
    );
  } catch (error) {
    throw error;
  }

  return userRepository.getUserById(user.id);
};

const updateUser = async (id, userData) => {
  const existingUser =
    await userRepository.getUserById(id);

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const {
    name,
    email,
    password,
    roleIds,
    schoolIds,
  } = userData;

  if (email && email !== existingUser.email) {
    const emailUser =
      await userRepository.getUserByEmail(email);

    if (emailUser && emailUser.id !== id) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  let passwordHash;

  if (password) {
    passwordHash = await bcrypt.hash(password, 12);
  }

  await userRepository.updateUser(
    id,
    name,
    email,
    passwordHash
  );

  if (roleIds !== undefined) {
    await userRepository.removeRoles(id);

    await userRepository.assignRoles(
      id,
      roleIds
    );
  }

  if (schoolIds !== undefined) {
    await userRepository.removeSchools(id);

    await userRepository.assignSchools(
      id,
      schoolIds
    );
  }

  return userRepository.getUserById(id);
};

const updateUserStatus = async (
  id,
  isActive
) => {
  const existingUser =
    await userRepository.getUserById(id);

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return userRepository.updateUserStatus(
    id,
    isActive
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserStatus,
};