import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TrashCategoryList from "@/components/category/TrashCategoryList";
import ComponentCard from "@/components/common/ComponentCard";

export const metadata: Metadata = {
  title: "Nestira Admin | Trash Category",
  description: "This is Next.js Form Trash Category page for Nestira Admin Dashboard Template",
};

const TrashCategoryPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Trash Category" />
      <div className="space-y-6">
        <ComponentCard title="Trash Category List">
          <TrashCategoryList />
        </ComponentCard>
      </div>
    </div>
  );
};

export default TrashCategoryPage;
