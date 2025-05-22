import { User } from "@/types/user";

export function getUserEmail(user: User | any): string {
  if (!user) return "loading@example.com"; 
  return user.role === "demo" ? "demo@gmail.com" : "admin@gmail.com";
}
