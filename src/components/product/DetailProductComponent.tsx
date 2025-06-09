"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Lang from "@/types/lang";
import Loader from "@/components/common/Loader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FiveColumnImageGrid from "@/components/ui/images/FiveColumnImageGrid";
import { formatVND, formatUSD } from "@/utils/currency";
import { getDetailProduct } from "@/services/product";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

const DetailProductComponent = ({ id }: Props) => {
  const router = useRouter();
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const { data, isLoading } = useSWR(
    id ? [id, activeLang] : null,
    getDetailProduct,
  );

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div>
        <div className="mb-4 flex justify-between">
          <KeyboardBackspaceIcon
            className="h-6 w-6 cursor-pointer dark:text-white"
            onClick={() => router.back()}
          />
          <div className="flex justify-end space-x-2">
            {["en", "vi"].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang as "en" | "vi")}
                className={`rounded-[2px] px-3 py-1 text-sm font-bold ${
                  activeLang === lang
                    ? "bg-[#0370af] text-white"
                    : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                } hover:bg-opacity-90`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Image Product */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Image Product
            </h2>
            <FiveColumnImageGrid images={data?.images || []} />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Product Name
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.name}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Brand
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.brand}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Product Code
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.productCode}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Color
              </h3>
              <div className="flex items-center space-x-2">
                <span
                  className="h-4 w-4 border"
                  style={{ backgroundColor: data?.color }}
                ></span>
                <p className="text-base font-semibold text-gray-800 dark:text-white">
                  {data?.color}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Origin
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.origin}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Material
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.material}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Size
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.size}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Specifications
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.specifications}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Price
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {activeLang === "en"
                  ? formatUSD(data?.price)
                  : formatVND(data?.price)}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Total Price
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {activeLang === "en"
                  ? formatUSD(data?.totalPrice)
                  : formatVND(data?.totalPrice)}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Active Status
              </h3>
              <span
                className={`inline-block px-2 py-0.5 text-xs font-medium ${
                  data?.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {data?.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Category
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.category?.name}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Created At
              </h3>
              <p className="text-base text-gray-700 dark:text-white/80">
                {new Date(data?.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Updated At
              </h3>
              <p className="text-base text-gray-700 dark:text-white/80">
                {new Date(data?.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Description
            </h2>
            <div
              className="prose dark:prose-invert prose-sm max-w-none text-gray-800 dark:text-white/90"
              dangerouslySetInnerHTML={{ __html: data?.description || "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductComponent;
