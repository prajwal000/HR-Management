import "server-only";
import { randomInt } from "crypto";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
const SYMBOLS = "!@#$%&*";

export function generateTemporaryPassword(length = 12): string {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += CHARS[randomInt(CHARS.length)];
  }
  const symbolPosition = randomInt(length);
  const symbol = SYMBOLS[randomInt(SYMBOLS.length)];
  return (
    password.slice(0, symbolPosition) +
    symbol +
    password.slice(symbolPosition + 1)
  );
}
