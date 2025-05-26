import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CategoryList from "@/components/category/CategoryList";

export const metadata: Metadata = {
  title: "Nestira Admin | Category List",
  description: "This is Next.js Category List page for Nestira Admin Dashboard Template",
};

const ListForCategory = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Category List" />
      <div className="space-y-6">
        <CategoryList />
      </div>
    </div>
  );
};

export default ListForCategory;
