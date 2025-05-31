"use client";
import useSWR from "swr";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";

import { useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/useUserInfo";
import React, { useState, useEffect } from "react";
import { getTrashCategory } from "@/services/category";
import { Delete, Restore, Inbox } from "@mui/icons-material";
import { hardDeleteCategory, restoreCategory } from "@/services/category";

const TrashCategoryList = () => {
  const router = useRouter();
  const { user } = useUserInfo();
  const [categoryData, setCategoryData] = useState([]);

  const { data, isLoading } = useSWR(
    "/api/category/list-delete",
    getTrashCategory,
  );

  const handleRestore = async (id: string) => {
    try {
      if (!user || user.role !== "admin") {
        toast("Only admins are allowed to restore category.", {
          icon: "⚠️",
          position: "bottom-right",
        });
        return;
      }

      const dataRes = await restoreCategory(id);
      setCategoryData((prevData) =>
        prevData.filter((item: any) => item.id !== id),
      );
      toast.success(dataRes.message, { position: "bottom-right" });

      router.push("/list-for-category");
    } catch (err: any) {
      toast.error(err.message, { position: "bottom-right" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to permanently delete a category.", {
        icon: "⚠️",
        position: "bottom-right",
      });
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      customClass: {
        container: "swal-high-zindex",
      },
      didOpen: () => {
        const swalContainer = document.querySelector(
          ".swal2-container",
        ) as HTMLElement;
        if (swalContainer) {
          swalContainer.style.zIndex = "999999";
        }
      },
    });

    if (result.isConfirmed) {
      try {
        const dataRes = await hardDeleteCategory(id);
        setCategoryData((prevData) =>
          prevData.filter((item: any) => item.id !== id),
        );
        toast.success(dataRes.message, { position: "bottom-right" });
      } catch (error: any) {
        toast.error(error.message, { position: "bottom-right" });
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setCategoryData(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {!categoryData || categoryData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4">
            <Inbox sx={{ fontSize: 64, color: "#9CA3AF" }} />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-white/90">
            Trash is empty
          </h3>
          <p className="max-w-md text-center text-base text-gray-500 dark:text-gray-400">
            Items moved to the trash will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {categoryData.map((item: any) => (
            <div
              key={item.id}
              className="flex cursor-pointer items-center justify-between border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <div className="flex-1">
                <h3 className="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
                  {item.name}
                </h3>
                <div className="text-xs text-gray-500">
                  <span>
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    Updated: {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="ml-4 flex items-center space-x-2">
                <button
                  onClick={() => handleRestore(item.id)}
                  className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50 hover:text-green-700"
                  title="Restore"
                >
                  <Restore />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                  title="Hard Delete"
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrashCategoryList;
