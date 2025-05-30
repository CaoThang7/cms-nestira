"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Lang from "@/types/lang";
import toast from "react-hot-toast";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Loader from "@/components/common/Loader";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import TiptapEditor from "@/components/common/TiptapEditor";
import translations from "@/components/common/translations.json";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { ChevronDownIcon } from "@/icons";
import { Category } from "@/types/category";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getAllCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/utils/errorMessages";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { updateProduct, getDetailProduct } from "@/services/product";
import { updateProductSchema, UpdateProductFormType } from "@/schemas/product";

const UpdateProductForm = () => {
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const [inputValue, setInputValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loadedStatus, setLoadedStatus] = useState<Record<string, boolean>>({});

  const router = useRouter();
  const { user } = useUserInfo();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useSWR<Category[]>("/api/category/get-list", getAllCategory);
  const { data: dataDetail, isLoading } = useSWR(
    id ? [id, activeLang] : null,
    getDetailProduct,
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<UpdateProductFormType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: { en: "", vi: "" },
      brand: "",
      productCode: "",
      price: 0,
      totalPrice: 0,
      color: "",
      origin: { en: "", vi: "" },
      material: { en: "", vi: "" },
      size: "",
      description: { en: "", vi: "" },
      specifications: { en: "", vi: "" },
      categoryId: 0,
      imageUrls: [],
    },
  });

  const sizeError = getErrorMessage(errors.size?.message, activeLang);
  const colorError = getErrorMessage(errors.color?.message, activeLang);
  const brandError = getErrorMessage(errors.brand?.message, activeLang);
  const priceError = getErrorMessage(errors.price?.message, activeLang);
  const imageError = getErrorMessage(errors.imageUrls?.message, activeLang);
  const totalPriceError = getErrorMessage(
    errors.totalPrice?.message,
    activeLang,
  );
  const productCodeError = getErrorMessage(
    errors.productCode?.message,
    activeLang,
  );
  const categoryNameError = getErrorMessage(
    errors.categoryId?.message,
    activeLang,
  );
  const categoryId = watch("categoryId");
  const imageUrls = watch("imageUrls");

  const handleAddImage = () => {
    const trimmedUrl = inputValue.trim();
    if (
      trimmedUrl &&
      trimmedUrl.startsWith("http") &&
      !imageUrls.includes(trimmedUrl)
    ) {
      const updated = [...imageUrls, trimmedUrl];
      setValue("imageUrls", updated, { shouldValidate: true });
      setInputValue("");
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    const updated = imageUrls.filter((url) => url !== urlToRemove);
    setValue("imageUrls", updated, { shouldValidate: true });
    setLoadedStatus((prev) => {
      const updatedStatus = { ...prev };
      delete updatedStatus[urlToRemove];
      return updatedStatus;
    });
  };

  const handleImageLoad = (url: string) => {
    setLoadedStatus((prev) => ({ ...prev, [url]: true }));
  };

  const onSubmit: SubmitHandler<UpdateProductFormType> = async (data) => {
    setIsSubmitting(true);

    try {
      if (!user || user.role !== "admin") {
        toast("Only admins are allowed to update a product.", {
          icon: "⚠️",
          position: "bottom-right",
        });
        return;
      }

      const dataRes = await updateProduct(data, id || "");
      toast.success(dataRes.message, { position: "bottom-right" });

      router.push("/list-for-product");
    } catch (err: any) {
      toast.error(err.message, { position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data) {
      setCategoryData(data);
    }
    if (dataDetail) {
      const imageUrlArray = dataDetail.images?.map((img: any) => img.url) || [];

      setValue(`name.${activeLang}`, dataDetail.name || "");
      setValue(`brand`, dataDetail.brand || "");
      setValue(`productCode`, dataDetail.productCode || "");
      setValue(`price`, dataDetail.price || 0);
      setValue(`totalPrice`, dataDetail.totalPrice || 0);
      setValue(`color`, dataDetail.color || "");
      setValue(`origin.${activeLang}`, dataDetail.origin || "");
      setValue(`material.${activeLang}`, dataDetail.material || "");
      setValue(`size`, dataDetail.size || "");
      setValue(`description.${activeLang}`, dataDetail.description || "");
      setValue(`specifications.${activeLang}`, dataDetail.specifications || "");
      setValue(`categoryId`, dataDetail?.category.id || 0);
      setValue("imageUrls", imageUrlArray);
    }
  }, [data, dataDetail, activeLang, setValue]);

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

        {/* Input Name */}
        <div>
          <Label>{translations[activeLang].labelNameProduct}</Label>
          <Input
            {...register(`name.${activeLang}`)}
            placeholder={translations[activeLang].placeholderNameProduct}
            error={errors.name?.[activeLang]?.message}
          />
          {errors.name?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.name[activeLang]?.message}
            </p>
          )}
        </div>

        {/* Input Brand */}
        <div>
          <Label>{translations[activeLang].labelBrandProduct}</Label>
          <Input
            {...register("brand")}
            placeholder={translations[activeLang].placeholderBrandProduct}
            error={brandError}
          />
          {brandError && <p className="text-sm text-red-500">{brandError}</p>}
        </div>

        {/* Input Product Code */}
        <div>
          <Label>{translations[activeLang].labelProductCode}</Label>
          <Input
            {...register("productCode")}
            placeholder={translations[activeLang].placeholderProductCode}
            error={productCodeError}
          />
          {productCodeError && (
            <p className="text-sm text-red-500">{productCodeError}</p>
          )}
        </div>

        {/* Input price */}
        <div>
          <Label>{translations[activeLang].labelPriceProduct}</Label>
          <Input
            type="number"
            min="0"
            {...register("price", { valueAsNumber: true })}
            placeholder={translations[activeLang].placeholderPriceProduct}
            error={priceError}
          />
          {priceError && <p className="text-sm text-red-500">{priceError}</p>}
        </div>

        {/* Input Total Price */}
        <div>
          <Label>{translations[activeLang].labelTotalPriceProduct}</Label>
          <Input
            type="number"
            min="0"
            {...register("totalPrice", { valueAsNumber: true })}
            placeholder={translations[activeLang].placeholderTotalPriceProduct}
            error={totalPriceError}
          />
          {totalPriceError && (
            <p className="text-sm text-red-500">{totalPriceError}</p>
          )}
        </div>

        {/* Input Color */}
        <div>
          <Label>{translations[activeLang].labelColorProduct}</Label>
          <Input
            {...register("color")}
            placeholder={translations[activeLang].placeholderColorProduct}
            error={colorError}
          />
          {colorError && <p className="text-sm text-red-500">{colorError}</p>}
        </div>

        {/* Input Origin */}
        <div>
          <Label>{translations[activeLang].labelOriginProduct}</Label>
          <Input
            {...register(`origin.${activeLang}`)}
            placeholder={translations[activeLang].placeholderOriginProduct}
            error={errors.origin?.[activeLang]?.message}
          />
          {errors.origin?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.origin[activeLang]?.message}
            </p>
          )}
        </div>

        {/* Input Material */}
        <div>
          <Label>{translations[activeLang].labelMaterialProduct}</Label>
          <Input
            {...register(`material.${activeLang}`)}
            placeholder={translations[activeLang].placeholderMaterialProduct}
            error={errors.material?.[activeLang]?.message}
          />
          {errors.material?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.material[activeLang]?.message}
            </p>
          )}
        </div>

        {/* Input Size */}
        <div>
          <Label>{translations[activeLang].labelSizeProduct}</Label>
          <Input
            {...register("size")}
            placeholder={translations[activeLang].placeholderSizeProduct}
            error={sizeError}
          />
          {sizeError && <p className="text-sm text-red-500">{sizeError}</p>}
        </div>

        {/* Tiptap Description */}
        <div>
          <Label>{translations[activeLang].labelDescriptionProduct}</Label>
          <TiptapEditor
            value={getValues(`description.${activeLang}`) || ""}
            onChange={(val) => setValue(`description.${activeLang}`, val)}
          />
          {errors.description?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.description[activeLang]?.message}
            </p>
          )}
        </div>

        {/* Input Specifications */}
        <div>
          <Label>{translations[activeLang].labelSpecificationsProduct}</Label>
          <Input
            {...register(`specifications.${activeLang}`)}
            placeholder={
              translations[activeLang].placeholderSpecificationsProduct
            }
            error={errors.specifications?.[activeLang]?.message}
          />
          {errors.specifications?.[activeLang] && (
            <p className="text-sm text-red-500">
              {errors.specifications[activeLang]?.message}
            </p>
          )}
        </div>

        {/* Select Category */}
        <div>
          <Label>{translations[activeLang].labelCategoryProductName}</Label>
          <div className="relative">
            <Select
              options={categoryData.map((category: any) => ({
                value: String(category.id),
                label: category.name,
              }))}
              placeholder={
                translations[activeLang].placeholderCategoryProductName
              }
              onChange={(selectedValue: any) => {
                setValue("categoryId", parseInt(selectedValue));
              }}
              value={String(categoryId || "")}
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {categoryNameError && (
            <p className="text-sm text-red-500">{categoryNameError}</p>
          )}
        </div>

        {/* Hidden field for react-hook-form to manage */}
        <Input type="hidden" {...register("imageUrls")} />

        {/* Input Image */}
        <div>
          <div>
            <Label>{translations[activeLang].labelImageProduct}</Label>
            <Input
              type="text"
              placeholder={translations[activeLang].placeholderImageProduct}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddImage();
                }
              }}
              className="w-full rounded border p-2"
              {...({} as any)}
              error={imageError}
            />
          </div>

          {imageError && <p className="text-sm text-red-500">{imageError}</p>}
        </div>

        {/* Image Preview */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {imageUrls.map((url: any) => (
              <div
                key={url}
                className="relative aspect-video w-full overflow-hidden rounded bg-gray-100"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-1 right-1 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow hover:bg-gray-800"
                >
                  <CloseIcon fontSize="small" />
                </button>

                {!loadedStatus[url] && (
                  <div className="bg-opacity-70 absolute inset-0 z-10 flex items-center justify-center bg-white">
                    <span className="text-gray-500">Loading...</span>
                  </div>
                )}

                <Image
                  src={url}
                  alt="preview"
                  className="h-full w-full object-cover"
                  width={640}
                  height={360}
                  onLoad={() => handleImageLoad(url)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Button Update Product */}
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Update Product"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateProductForm;
