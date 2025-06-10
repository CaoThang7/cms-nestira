import React from "react";
import type { Metadata } from "next";
import YearSalesChart from "@/components/ecommerce/YearSalesChart";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";

export const metadata: Metadata = {
  title: "Nestira Admin | Home",
  description: "This is Next.js Home for Nestira Admin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12">
        <YearSalesChart />
      </div>
    </div>
  );
}
