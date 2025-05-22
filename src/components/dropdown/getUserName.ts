import { User } from "@/types/user";

export function getUserName(user: User | any): string {
  if (!user) return "Username"; 
  return user.role === "demo" ? "demo" : "Ly Cao Thang";
}
