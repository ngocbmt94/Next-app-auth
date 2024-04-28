import { hash, compare } from "bcryptjs";

export async function hashPassword(pw) {
  const hashPW = hash(pw, 12);
  return hashPW;
}

export async function verifyPassword(pw, hashedPw) {
  const isValid = await compare(pw, hashedPw);

  return isValid;
}
