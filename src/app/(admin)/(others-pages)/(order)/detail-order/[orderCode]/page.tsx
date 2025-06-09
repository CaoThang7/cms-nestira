import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DetailOrderComponent from "@/components/order/DetailOrderComponent";

export const metadata: Metadata = {
  title: "Nestira Admin | Detail Order",
  description: "This is Next.js Form Detail Order page for Nestira Admin Dashboard Template",
};

const DetailOrderPage = async ({ params }: { params: Promise<{ orderCode: string }> }) => {
  const { orderCode } = await params;
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Detail Order" />
      <DetailOrderComponent orderCode={orderCode} />
    </div>
  );
};

export default DetailOrderPage;