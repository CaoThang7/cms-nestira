import { User } from "@/types/user";

export function getUserAvatar(user: User | any): string {
  if (!user) return "/images/user/avatar-default.jpg";

  return user.role === "demo"
    ? "/images/user/user-12.jpg"
    : "/images/user/avatar-02.jpg";
}
