"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Lang from "@/types/lang";
import toast from "react-hot-toast";
import Label from "@/components/form/Label";
import Loader from "@/components/common/Loader";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import translations from "@/components/common/translations.json";
import TextAreaCustom from "@/components/form/input/TextAreaCustom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useForm } from "react-hook-form";
import { useUserInfo } from "@/hooks/useUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCategory, getDetailCategory } from "@/services/category";
import {
  updateCategorySchema,
  UpdateCategoryFormType,
} from "@/schemas/category";

const UpdateCategoryForm = () => {
  const router = useRouter();
  const { user } = useUserInfo();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [error, setError] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data, isLoading } = useSWR(
    id ? [id, activeLang] : null,
    getDetailCategory,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateCategoryFormType>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: { en: "", vi: "" },
      description: { en: "", vi: "" },
    },
  });

  const onSubmit = async (formData: UpdateCategoryFormType) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (!user || user.role !== "admin") {
        toast("Only admins are allowed to update a category.", {
          icon: "⚠️",
          position: "bottom-right",
        });
        return;
      }
      const dataRes = await updateCategory(formData, id || "");
      toast.success(dataRes.message, { position: "bottom-right" });
      router.push("/list-for-category");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message, { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data) {
      setValue(`name.${activeLang}`, data.name || "");
      setValue(`description.${activeLang}`, data.description || "");
    }
  }, [data, activeLang, setValue]);

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
        </div>

        <div>
          <Label>{translations[activeLang].labelNameCategory}</Label>
          <Input
            {...register(`name.${activeLang}`)}
            placeholder={translations[activeLang].placeholderNameCategory}
            error={errors.name?.[activeLang]?.message}
          />
          {errors.name?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.name[activeLang]?.message}
            </p>
          )}
        </div>

        <div>
          <Label>{translations[activeLang].labelDescriptionCategory}</Label>
          <TextAreaCustom
            {...register(`description.${activeLang}`)}
            placeholder={
              translations[activeLang].placeholderDescriptionCategory
            }
            rows={6}
            error={errors.description?.[activeLang]?.message}
          />
          {errors.description?.[activeLang] && (
            <p className="-mt-1.5 text-sm text-red-500">
              {errors.description[activeLang]?.message}
            </p>
          )}

          {error && (
            <div className="text-error-500 dark:text-error-500 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Update Category"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateCategoryForm;
