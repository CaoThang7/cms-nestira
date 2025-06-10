"use client";
import useSWR from "swr";
import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

import { ApexOptions } from "apexcharts";
import { formatUSD } from "@/utils/currency";
import { getMonthlyStats } from "@/services/statistical";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface MonthlyData {
  month: number;
  totalOrders: number;
  totalIncome: number;
  growthRate: number;
}

export default function MonthlySalesChart() {
  const { data, isLoading } = useSWR(
    "/api/statistical/get-monthly-stats",
    getMonthlyStats,
  );

  // Process data to get chart data
  const chartData = Array.isArray(data)
    ? data.map((item: MonthlyData) => ({
        month: item.month,
        totalOrders: item.totalOrders,
        totalIncome: item.totalIncome,
        growthRate: item.growthRate,
      }))
    : [];

  const options: ApexOptions = {
    colors: ["#465fff", "#10b981", "#f59e0b"], // Added third color for growth rate
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line", // Changed to line for mixed chart
      height: 220, // Increased height for better visibility
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 0, 3], // No stroke for bars, 3px for growth line
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: [
      {
        labels: {
          formatter: (val: number) => {
            if (val == null || val === 0) return "$0";
            return formatUSD(val).replace(/\.\d{2}$/, "");
          },
        },
        min: 0, // Force minimum to show bars even for 0 values
      },
      {
        opposite: true,
        labels: {
          formatter: (val: number) => (val != null ? `${val}` : "0"),
        },
        min: 0, // Force minimum to show bars even for 0 values
      },
      {
        opposite: true,
        labels: {
          formatter: (val: number) =>
            val != null ? `${val.toFixed(0)}%` : "0%",
        },
        min: -100,
        max: 100,
      },
    ],
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: [1, 1, 0.3], // Different opacity for different series
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        show: true,
      },
      y: [
        {
          formatter: (val: number) => (val != null ? formatUSD(val) : "$0"),
          title: {
            formatter: () => "Revenue: ",
          },
        },
        {
          formatter: (val: number) =>
            val != null ? `${val} orders` : "0 orders",
          title: {
            formatter: () => "Orders: ",
          },
        },
        {
          formatter: (val: number) =>
            val != null ? `${val.toFixed(1)}%` : "0%",
          title: {
            formatter: () => "Growth: ",
          },
        },
      ],
    },
  };

  // Create series data from API response
  const series = [
    {
      name: "Revenue",
      type: "column",
      yAxisIndex: 0,
      data: chartData.map((item: any) => item.totalIncome || 0),
    },
    {
      name: "Orders",
      type: "column",
      yAxisIndex: 1,
      data: chartData.map((item: any) => item.totalOrders || 0),
    },
    {
      name: "Growth Rate",
      type: "line",
      yAxisIndex: 2,
      data: chartData.map((item: any) => item.growthRate || 0),
    },
  ];

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden rounded-[2px] border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Sales
        </h3>
      </div>

      {/* Summary stats */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <div className="rounded-[2px] bg-gray-50 p-3 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Orders
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {chartData.reduce(
              (sum: number, item: any) => sum + item.totalOrders,
              0,
            )}
          </p>
        </div>
        <div className="rounded-[2px] bg-gray-50 p-3 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Revenue
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {formatUSD(
              chartData.reduce(
                (sum: number, item: any) => sum + item.totalIncome,
                0,
              ),
            )}
          </p>
        </div>
        <div className="rounded-[2px] bg-gray-50 p-3 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Peak Month</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {chartData.length > 0
              ? (() => {
                  const maxIncomeIndex = chartData.reduce(
                    (maxIndex: number, item: any, index: number) =>
                      item.totalIncome > chartData[maxIndex].totalIncome
                        ? index
                        : maxIndex,
                    0,
                  );
                  return options.xaxis?.categories?.[maxIncomeIndex] || "N/A";
                })()
              : "N/A"}
          </p>
        </div>
        <div className="rounded-[2px] bg-gray-50 p-3 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Growth</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {chartData.length > 0
              ? `${(chartData.reduce((sum: number, item: any) => sum + item.growthRate, 0) / chartData.length).toFixed(1)}%`
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="custom-scrollbar mt-6 max-w-full overflow-x-auto">
        <div className="-ml-5 min-w-[650px] pl-2 xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={250}
          />
        </div>
      </div>
    </div>
  );
}
