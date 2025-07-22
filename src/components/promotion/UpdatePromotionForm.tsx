"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Lang from "@/types/lang";
import toast from "react-hot-toast";
import Label from "@/components/form/Label";
import Loader from "@/components/common/Loader";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import TiptapEditor from "@/components/common/TiptapEditor";
import translations from "@/components/common/translations.json";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useUserInfo } from "@/hooks/useUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/utils/errorMessages";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { getDetailPromotion, updatePromotion } from "@/services/promotion";
import {
  UpdatePromotionFormType,
  updatePromotionSchema,
} from "@/schemas/promotion";

const UpdatePromotionForm = () => {
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dataCache, setDataCache] = useState<{
    en?: any;
    vi?: any;
  }>({});

  const router = useRouter();
  const { user } = useUserInfo();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: dataDetail, isLoading } = useSWR(
    id ? [id, activeLang] : null,
    getDetailPromotion,
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UpdatePromotionFormType>({
    resolver: zodResolver(updatePromotionSchema),
    defaultValues: {
      title: { en: "", vi: "" },
      content: { en: "", vi: "" },
      thumbnail: "",
    },
  });

  const thumbnailError = getErrorMessage(errors.thumbnail?.message, activeLang);

  const onSubmit: SubmitHandler<UpdatePromotionFormType> = async (data) => {
    setIsSubmitting(true);

    try {
      if (!user || user.role !== "admin") {
        toast("Only admins are allowed to update a promotion.", {
          icon: "⚠️",
          position: "bottom-right",
        });
        return;
      }

      const dataRes = await updatePromotion(data, id || "");
      toast.success(dataRes.message, { position: "bottom-right" });

      router.push("/list-for-promotion");
    } catch (err: any) {
      toast.error(err.message, { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cache data when received from API
  useEffect(() => {
    if (dataDetail) {
      setDataCache((prev) => ({
        ...prev,
        [activeLang]: dataDetail,
      }));

      // Set form values
      setValue(`title.${activeLang}`, dataDetail.title || "");
      setValue(`content.${activeLang}`, dataDetail.content || "");
      setValue(`thumbnail`, dataDetail.thumbnail || "");
    }
  }, [dataDetail, activeLang, setValue]);

  // Update form values when switching language (use cached data if available)
  const handleLanguageSwitch = (newLang: Lang) => {
    // Save current content before switching
    const currentContent = getValues(`content.${activeLang}`);
    if (currentContent && dataCache[activeLang]) {
      setDataCache((prev) => ({
        ...prev,
        [activeLang]: {
          ...prev[activeLang],
          content: currentContent,
        },
      }));
    }

    setActiveLang(newLang);

    // Load cached data for new language if available
    const cachedData = dataCache[newLang];
    if (cachedData) {
      setValue(`title.${newLang}`, cachedData.title || "");
      setValue(`content.${newLang}`, cachedData.content || "");
      setValue(`thumbnail`, cachedData.thumbnail || "");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
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
                onClick={() => handleLanguageSwitch(lang as "en" | "vi")}
                className={`rounded px-3 py-1 text-sm font-bold ${
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

        {/* Input Title */}
        <div>
          <Label>{translations[activeLang].labelTitlePromotion}</Label>
          <Input
            {...register(`title.${activeLang}`)}
            placeholder={translations[activeLang].placeholderTitlePromotion}
            error={errors.title?.[activeLang]?.message}
          />
          {errors.title?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.title[activeLang]?.message}
            </p>
          )}
        </div>

        {/* Tiptap Content */}
        <div>
          <Label>{translations[activeLang].labelContentPromotion}</Label>
          {/* Add key with cached data to force proper re-render */}
          <TiptapEditor
            key={`tiptap-${activeLang}-${dataCache[activeLang]?.id || "empty"}`}
            value={getValues(`content.${activeLang}`) || ""}
            onChange={(val) => {
              setValue(`content.${activeLang}`, val);
              // Update cache when user edits content
              setDataCache((prev) => ({
                ...prev,
                [activeLang]: {
                  ...prev[activeLang],
                  content: val,
                },
              }));
            }}
          />
          {errors.content?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.content[activeLang]?.message}
            </p>
          )}
        </div>

        {/* Input Thumbnail */}
        <div>
          <Label>{translations[activeLang].labelThumbnailPromotion}</Label>
          <Input
            {...register("thumbnail")}
            placeholder={translations[activeLang].placeholderThumbnailPromotion}
            error={thumbnailError}
          />
          {thumbnailError && (
            <p className="text-sm text-red-500">{thumbnailError}</p>
          )}
        </div>

        {/* Button Update Promotion */}
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Update Promotion"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePromotionForm;
