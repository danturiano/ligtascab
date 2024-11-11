import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { randomBytes, pbkdf2Sync } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to salt and hash a password (for registration)
export function saltAndHashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

// Function to verify password (for login)
export function verifyPassword(
  inputPassword: string,
  storedHashString: string
): boolean {
  try {
    const [salt, storedHash] = storedHashString.split(":");

    // Generate hash of input password using the same salt
    const inputHash = pbkdf2Sync(
      inputPassword,
      salt,
      1000,
      64,
      "sha512"
    ).toString("hex");

    // Compare the generated hash with stored hash
    return inputHash === storedHash;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}
