import React, { Suspense } from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UpdateCategoryForm from "@/components/category/UpdateCategoryForm";

export const metadata: Metadata = {
  title: "Nestira Admin | Update Category",
  description:
    "This is Next.js Form Update Category page for Nestira Admin Dashboard Template",
};

const CreateCategoryPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Update Category" />
      <Suspense>
        <UpdateCategoryForm />
      </Suspense>
    </div>
  );
};

export default CreateCategoryPage;
