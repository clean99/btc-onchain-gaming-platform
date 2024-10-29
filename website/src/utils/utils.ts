import { Collection } from "@/types";
import crypto from 'crypto';

export function isPasscard(collection: Collection): boolean {
    return collection.name === 'Jump Explorer';
}

function generateToken() {
  // Generate 8 random bytes (64 bits) and convert them to a hex string
  return crypto.randomBytes(8).toString('hex');
}

function generateUniqueTokens(count: number = 100) {
  const tokens = new Set();
  while (tokens.size < count) {
    tokens.add(generateToken());
  }
  return Array.from(tokens);
}

// Example usage:
// const tokens = generateUniqueTokens(100); // Generate 10 unique tokens
// console.log(tokens);
