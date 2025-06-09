import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import OrderList from "@/components/order/OrderList";

export const metadata: Metadata = {
  title: "Nestira Admin | Order List",
  description: "This is Next.js Order List page for Nestira Admin Dashboard Template",
};

const ListForOrder = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Order List" />
      <div className="space-y-6">
        <OrderList />
      </div>
    </div>
  );
};

export default ListForOrder;
