"use client";

import React, { useState, useEffect } from "react";
import Lang from "@/types/lang";
import toast from "react-hot-toast";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import TiptapEditor from "@/components/common/TiptapEditor";
import translations from "@/components/common/translations.json";

import { useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/useUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPromotion } from "@/services/promotion";
import { getErrorMessage } from "@/utils/errorMessages";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CreatePromotionFormType,
  createPromotionSchema,
} from "@/schemas/promotion";

const CreatePromotionForm = () => {
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { user } = useUserInfo();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreatePromotionFormType>({
    resolver: zodResolver(createPromotionSchema),
    defaultValues: {
      title: { en: "", vi: "" },
      content: { en: "", vi: "" },
      thumbnail: "",
    },
  });

  const thumbnailError = getErrorMessage(errors.thumbnail?.message, activeLang);

  const onSubmit: SubmitHandler<CreatePromotionFormType> = async (data) => {
    setIsSubmitting(true);

    try {
      if (!user || user.role !== "admin") {
        toast("Only admins are allowed to create a promotion.", {
          icon: "⚠️",
          position: "bottom-right",
        });
        return;
      }

      const dataRes = await createPromotion(data);
      toast.success(dataRes.message, { position: "bottom-right" });

      setValue("title.en", "");
      setValue("title.vi", "");
      setValue("content.en", "");
      setValue("content.vi", "");
      setValue("thumbnail", "");

      router.push("/list-for-promotion");
    } catch (err: any) {
      toast.error(err.message, { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const baseFields = ["thumbnail"];
    const langFields = ["title", "content"];

    // Set base fields (non-language dependent)
    baseFields.forEach((field: any) => {
      const value = getValues(field) || "";
      setValue(field, value);
    });

    // Set multilingual fields
    langFields.forEach((field: any) => {
      const path: any = `${field}.${activeLang}`;
      const value: any = getValues(path) || "";
      setValue(path, value);
    });
  }, [activeLang, getValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <div className="flex justify-end space-x-2">
          {["en", "vi"].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang as "en" | "vi")}
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
          <TiptapEditor
            value={getValues(`content.${activeLang}`) || ""}
            onChange={(val) => setValue(`content.${activeLang}`, val)}
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

        {/* Button Create Promotion */}
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Create Promotion"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreatePromotionForm;
