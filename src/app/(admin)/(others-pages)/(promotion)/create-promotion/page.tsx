import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CreatePromotionForm from "@/components/promotion/CreatePromotionForm";

export const metadata: Metadata = {
  title: "Nestira Admin | Create Promotion",
  description: "This is Next.js Form Create Promotion page for Nestira Admin Dashboard Template",
};

const CreatePromotionPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Promotion" />
      <CreatePromotionForm />
    </div>
  );
};

export default CreatePromotionPage;
