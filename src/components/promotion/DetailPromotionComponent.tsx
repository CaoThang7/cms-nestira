"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Lang from "@/types/lang";
import Loader from "@/components/common/Loader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getDetailPromotion } from "@/services/promotion";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

const DetailPromotionComponent = ({ id }: Props) => {
  const router = useRouter();
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const { data, isLoading } = useSWR(
    id ? [id, activeLang] : null,
    getDetailPromotion,
  );

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-[2px] border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
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
          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Promotion Title
              </h3>
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {data?.title}
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
          </div>

          {/* Content */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              Content
            </h2>
            {/* <div
              className="prose dark:prose-invert prose-sm max-w-none text-gray-800 dark:text-white/90"
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            /> */}
            <div
              className="prose dark:prose-invert prose-sm max-w-none text-gray-800 dark:text-white/90 [&_img]:mx-auto [&_img]:h-auto [&_img]:w-full [&_img]:rounded-none"
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPromotionComponent;
