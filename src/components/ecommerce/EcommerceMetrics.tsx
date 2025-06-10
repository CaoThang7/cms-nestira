"use client";
import useSWR from "swr";
import React from "react";
import { formatUSD } from "@/utils/currency";
import { getAnalyticsOverview } from "@/services/statistical";
import {
  CheckCircleIcon,
  BoxIconLine,
  DollarLineIcon,
  ErrorIcon,
} from "@/icons";

export const EcommerceMetrics = () => {
  const { data } = useSWR(
    "/api/statistical/get-analytics-overview",
    getAnalyticsOverview,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {/* Total Orders */}
      <div className="rounded-[2px] border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-blue-100 dark:bg-blue-800/20">
          <BoxIconLine className="size-6 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Orders
          </span>
          <h4 className="mt-2 text-xl font-bold text-gray-800 dark:text-white/90">
            {data?.totalOrders?.toLocaleString() || 0}
          </h4>
        </div>
      </div>

      {/* Total Income */}
      <div className="rounded-[2px] border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-yellow-100 dark:bg-yellow-800/20">
          <DollarLineIcon className="size-6 text-yellow-600 dark:text-yellow-400" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Income
          </span>
          <h4 className="mt-2 text-xl font-bold text-gray-800 dark:text-white/90">
            {data?.totalIncome ? formatUSD(data.totalIncome) : "0"}
          </h4>
        </div>
      </div>

      {/* Total Delivered */}
      <div className="rounded-[2px] border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-green-100 dark:bg-green-800/20">
          <CheckCircleIcon className="size-6 text-green-600 dark:text-green-400" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Delivered Orders
          </span>
          <h4 className="mt-2 text-xl font-bold text-gray-800 dark:text-white/90">
            {data?.totalDelivered?.toLocaleString() || 0}
          </h4>
        </div>
      </div>

      {/* Total Cancelled */}
      <div className="rounded-[2px] border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-red-100 dark:bg-red-800/20">
          <ErrorIcon className="size-6 text-red-600 dark:text-red-400" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Cancelled Orders
          </span>
          <h4 className="mt-2 text-xl font-bold text-gray-800 dark:text-white/90">
            {data?.totalCancelled?.toLocaleString() || 0}
          </h4>
        </div>
      </div>
    </div>
  );
};
