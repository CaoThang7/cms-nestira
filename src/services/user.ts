export async function getUserProfile(): Promise<any> {
  const res = await fetch("/api/auth/profile", { credentials: "include" });
  const data = await res.json();
  return data;
}
