import bcrypt from "bcrypt";

async function hashPassword() {
  const password = "admin001";
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);
}

hashPassword();
