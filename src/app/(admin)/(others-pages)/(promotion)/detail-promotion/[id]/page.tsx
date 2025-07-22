import React from "react";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DetailPromotionComponent from "@/components/promotion/DetailPromotionComponent";

export const metadata: Metadata = {
  title: "Nestira Admin | Detail Promotion",
  description: "This is Next.js Form Detail Promotion page for Nestira Admin Dashboard Template",
};

const DetailPromotionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <PageBreadcrumb pageTitle="Detail Promotion" />
      <DetailPromotionComponent id={id} />
    </div>
  );
};

export default DetailPromotionPage;
