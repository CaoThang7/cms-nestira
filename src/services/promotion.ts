import Lang from "@/types/lang";
import { Promotion } from "@/types/promotion";

export async function createPromotion(payload: Promotion) {
  const res = await fetch("/api/promotion/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Create promotion fail!");
  }

  return data;
}

export async function getAllPromotion() {
  const res = await fetch("/api/promotion/get-list");
  const dataPromotion = await res.json();
  return dataPromotion;
}

export const getDetailPromotion = async ([id, lang]: [string, Lang]) => {
  const res = await fetch(`/api/promotion/detail?id=${id}`, {
    headers: {
      "locale-language": lang,
    },
  });
  const dataPromotion = await res.json();
  return dataPromotion;
};

export async function updatePromotion(payload: Promotion, id: string) {
  const res = await fetch(`/api/promotion/update?id=${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Update promotion fail!");
  }

  return data;
}

export async function deletePromotion(id: string) {
  const res = await fetch(`/api/promotion/delete?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Delete promotion fail!");
  }

  return data;
}
