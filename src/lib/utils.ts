import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function saltAndHashPassword(password: string): Promise<string> {
  const { randomBytes, pbkdf2Sync } = await import("crypto");
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  inputPassword: string,
  storedHashString: string
): Promise<boolean> {
  try {
    const [salt, storedHash] = storedHashString.split(":");
    const { pbkdf2Sync } = await import("crypto");

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

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function formatPhoneNumber(number: number | string) {
  // Ensure the input is a string
  number = number.toString();

  // Validate the input format
  if (!/^0\d{10}$/.test(number)) {
    throw new Error("Invalid phone number format");
  }

  // Replace leading 0 with +63 and format the output
  const formatted = `(+63) ${number.slice(1, 4)}-${number.slice(4, 7)}-${number.slice(7)}`;

  return formatted;
}

export function formatDateTime(timestamp: string): string {
  const date = new Date(timestamp);

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

export const isExpiringWithinMonth = (expiryDate: Date): boolean => {
  const today = new Date();
  const oneMonthFromNow = new Date(today.setMonth(today.getMonth() + 1));
  const expiry = new Date(expiryDate);
  if (expiry <= oneMonthFromNow) {
    return true;
  }
  return false;
};
