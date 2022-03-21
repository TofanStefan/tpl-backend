import * as bcrypt from 'bcrypt';
const crypt_salt = 10;

export async function hashPassword(plain_password) {
  return await bcrypt.hash(plain_password, crypt_salt);
}

export async function comparePasswords(plain_password, hash) {
  return await bcrypt.compare(plain_password, hash);
}
