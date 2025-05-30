import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductList from "@/components/product/ProductList";

export const metadata: Metadata = {
  title: "Nestira Admin | Product List",
  description: "This is Next.js Product List page for Nestira Admin Dashboard Template",
};

const ListForProduct = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Product List" />
      <div className="space-y-6">
        <ProductList />
      </div>
    </div>
  );
};

export default ListForProduct;
