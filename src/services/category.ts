import Lang from "@/types/lang";
import { CategoryPayload } from "@/types/category";

export async function createCategory(payload: CategoryPayload) {
  const res = await fetch("/api/category/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Create category fail!");
  }

  return data;
}

export async function getAllCategory() {
  const res = await fetch("/api/category/get-list");
  const dataCategory = await res.json();
  return dataCategory.data;
}

export async function getTrashCategory() {
  const res = await fetch("/api/category/list-delete");
  const dataCategory = await res.json();
  return dataCategory.data;
}

export const getDetailCategory = async ([id, lang]: [string, Lang]) => {
  const res = await fetch(`/api/category/detail?id=${id}`, {
    headers: {
      "locale-language": lang,
    },
  });
  const dataCategory = await res.json();
  return dataCategory.data;
};

export async function updateCategory(payload: CategoryPayload, id: string) {
  const res = await fetch(`/api/category/update?id=${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Update category fail!");
  }

  return data;
}

export async function deleteCategory(id: string) {
  const res = await fetch(`/api/category/delete?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Delete category fail!");
  }

  return data;
}

export async function restoreCategory(id: string) {
  const res = await fetch(`/api/category/restore?id=${id}`, {
    method: "PATCH",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Restore category fail!");
  }

  return data;
}

export async function hardDeleteCategory(id: string) {
  const res = await fetch(`/api/category/hard-delete?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Hard delete category fail!");
  }

  return data;
}
