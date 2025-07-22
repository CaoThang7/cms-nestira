import React, { Suspense } from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UpdatePromotionForm from "@/components/promotion/UpdatePromotionForm";

export const metadata: Metadata = {
  title: "Nestira Admin | Update Promotion",
  description: "This is Next.js Form Update Promotion page for Nestira Admin Dashboard Template",
};

const UpdatePromotionPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Update Promotion" />
      <Suspense>
        <UpdatePromotionForm />
      </Suspense>
    </div>
  );
};

export default UpdatePromotionPage;
