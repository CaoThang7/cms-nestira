import React, { Suspense } from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UpdateProductForm from "@/components/product/UpdateProductForm";

export const metadata: Metadata = {
  title: "Nestira Admin | Update Product",
  description:
    "This is Next.js Form Update Product page for Nestira Admin Dashboard Template",
};

const UpdateProductPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Update Product" />
      <Suspense>
        <UpdateProductForm />
      </Suspense>
    </div>
  );
};

export default UpdateProductPage;
