"use client";

import React, { useState, useEffect } from "react";
import Lang from "@/types/lang";
import toast from "react-hot-toast";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import translations from "@/components/common/translations.json";
import TextAreaCustom from "@/components/form/input/TextAreaCustom";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/useUserInfo";
import { createCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, CategoryFormType } from "@/schemas/category";

const CreateCategoryForm = () => {
  const router = useRouter();
  const { user } = useUserInfo();

  const [activeLang, setActiveLang] = useState<Lang>("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: { en: "", vi: "" },
      description: { en: "", vi: "" },
    },
  });

  useEffect(() => {
    const currentValueName = getValues(`name.${activeLang}`) || "";
    const currentValueDescription = getValues(`description.${activeLang}`) || "";
    setValue(`name.${activeLang}`, currentValueName);
    setValue(`description.${activeLang}`, currentValueDescription);
  }, [activeLang, getValues, setValue]);

  const onSubmit = async (data: CategoryFormType) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (!user || user.role !== "admin") {
        toast("Only admins are allowed to create a category.", {
          icon: "⚠️",
          position: "bottom-right",
        });
        return;
      }

      const dataRes = await createCategory(data);
      toast.success(dataRes.message, { position: "bottom-right" });
      
      setValue("name.en", "");
      setValue("name.vi", "");
      setValue("description.en", "");
      setValue("description.vi", "");
      
      router.push("/list-for-category");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message, { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6"
    >
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
            placeholder={translations[activeLang].placeholderDescriptionCategory}
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
            {isSubmitting ? "Loading..." : "Create Category"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCategoryForm;
