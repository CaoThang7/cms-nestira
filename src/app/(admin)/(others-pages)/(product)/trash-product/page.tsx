import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TrashProductList from "@/components/product/TrashProductList";
import ComponentCard from "@/components/common/ComponentCard";

export const metadata: Metadata = {
  title: "Nestira Admin | Trash Product",
  description: "This is Next.js Form Trash Product page for Nestira Admin Dashboard Template",
};

const TrashProductPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Trash Product" />
      <div className="space-y-6">
        <ComponentCard title="Trash Product List">
          <TrashProductList />
        </ComponentCard>
      </div>
    </div>
  );
};

export default TrashProductPage;
