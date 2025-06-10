export async function getAnalyticsOverview() {
  const res = await fetch("/api/statistical/get-analytics-overview");
  const dataAnalyticsOverview = await res.json();
  return dataAnalyticsOverview;
}

export async function getMonthlyStats() {
  const res = await fetch("/api/statistical/get-monthly-stats");
  const dataMonthlyStats = await res.json();
  return dataMonthlyStats;
}

export async function getYearlyStats() {
  const res = await fetch("/api/statistical/get-yearly-stats");
  const dataYearlyStats = await res.json();
  return dataYearlyStats;
}

