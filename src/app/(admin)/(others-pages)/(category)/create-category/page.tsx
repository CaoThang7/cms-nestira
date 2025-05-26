import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CreateCategoryForm from "@/components/category/CreateCategoryForm";

export const metadata: Metadata = {
  title: "Nestira Admin | Create Category",
  description: "This is Next.js Form Create Category page for Nestira Admin Dashboard Template",
};

const CreateCategoryPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Category" />
      <CreateCategoryForm />
    </div>
  );
};

export default CreateCategoryPage;
