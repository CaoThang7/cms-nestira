import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CreateProductForm from "@/components/product/CreateProductForm";

export const metadata: Metadata = {
  title: "Nestira Admin | Create Product",
  description: "This is Next.js Form Create Product page for Nestira Admin Dashboard Template",
};

const CreateProductPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Product" />
      <CreateProductForm />
    </div>
  );
};

export default CreateProductPage;
