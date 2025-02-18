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
  storedHashString: string,
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
      "sha512",
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

// Example usage
const formattedDate = formatDateTime("2025-02-09 08:53:31.831182+00");
