import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PromotionList from "@/components/promotion/PromotionList";

export const metadata: Metadata = {
  title: "Nestira Admin | Promotion List",
  description: "This is Next.js Promotion List page for Nestira Admin Dashboard Template",
};

const ListForPromotion = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Promotion List" />
      <div className="space-y-6">
        <PromotionList />
      </div>
    </div>
  );
};

export default ListForPromotion;
