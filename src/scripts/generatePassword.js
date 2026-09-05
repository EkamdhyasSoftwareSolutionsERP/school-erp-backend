const bcrypt = require("bcrypt");

const generatePassword = async () => {
  const password = "Admin@123";

  const hash = await bcrypt.hash(password, 10);

  console.log("Password:", password);
  console.log("Hash:", hash);
};

generatePassword();