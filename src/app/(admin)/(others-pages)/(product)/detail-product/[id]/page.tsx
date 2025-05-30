import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DetailProductComponent from "@/components/product/DetailProductComponent";

export const metadata: Metadata = {
  title: "Nestira Admin | Detail Product",
  description: "This is Next.js Form Detail Product page for Nestira Admin Dashboard Template",
};

const DetailProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Detail Product" />
      <DetailProductComponent id={id} />
    </div>
  );
};

export default DetailProductPage;