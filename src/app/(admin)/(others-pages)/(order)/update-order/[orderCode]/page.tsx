import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UpdateOrderComponent from "@/components/order/UpdateOrderComponent";

export const metadata: Metadata = {
  title: "Nestira Admin | Update Order",
  description: "This is Next.js Form Update Order page for Nestira Admin Dashboard Template",
};

const UpdateOrderPage = async ({ params }: { params: Promise<{ orderCode: string }> }) => {
  const { orderCode } = await params;
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Update Order" />
      <UpdateOrderComponent orderCode={orderCode} />
    </div>
  );
};

export default UpdateOrderPage;