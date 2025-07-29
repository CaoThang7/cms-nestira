import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubscriberList from "@/components/subscriber/SubscriberList";

export const metadata: Metadata = {
  title: "Nestira Admin | Subscriber List",
  description: "This is Next.js Subscriber List page for Nestira Admin Dashboard Template",
};

const ListForSubscriber = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Subscriber List" />
      <div className="space-y-6">
        <SubscriberList />
      </div>
    </div>
  );
};

export default ListForSubscriber;
