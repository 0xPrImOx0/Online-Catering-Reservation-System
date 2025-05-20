export function avatarFallBack(name: string) {
  return name
    .split(" ") // Split by space
    .map((word) => word[0]) // Get first letter of each word
    .join("") // Join them together
    .toUpperCase() // Convert to uppercase
    .slice(0, 2); // Limit to two letters
}
