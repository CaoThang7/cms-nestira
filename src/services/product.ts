import Lang from "@/types/lang";
import { Product } from "@/types/product";

export async function createProduct(payload: Product) {
  const res = await fetch("/api/product/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Create product fail!");
  }

  return data;
}

export async function getAllProduct() {
  const res = await fetch("/api/product/get-list");
  const dataProduct = await res.json();
  return dataProduct.data;
}

export async function getTrashProduct() {
  const res = await fetch("/api/product/list-delete");
  const dataProduct = await res.json();
  return dataProduct.data;
}

export const getDetailProduct = async ([id, lang]: [string, Lang]) => {
  const res = await fetch(`/api/product/detail?id=${id}`, {
    headers: {
      "locale-language": lang,
    },
  });
  const dataProduct = await res.json();
  return dataProduct.data;
};

export async function updateProduct(payload: Product, id: string) {
  const res = await fetch(`/api/product/update?id=${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Update product fail!");
  }

  return data;
}

export async function deleteProduct(id: string) {
  const res = await fetch(`/api/product/delete?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Delete product fail!");
  }

  return data;
}

export async function restoreProduct(id: string) {
  const res = await fetch(`/api/product/restore?id=${id}`, {
    method: "PATCH",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Restore product fail!");
  }

  return data;
}

export async function hardDeleteProduct(id: string) {
  const res = await fetch(`/api/product/hard-delete?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Hard delete product fail!");
  }

  return data;
}