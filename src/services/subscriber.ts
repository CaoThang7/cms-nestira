import Lang from "@/types/lang";

export async function getAllSubscribers() {
  const res = await fetch("/api/subscriber/get-list");
  const dataSubscribers = await res.json();
  return dataSubscribers.data;
}

export async function deleteSubscriber(id: string) {
  const res = await fetch(`/api/subscriber/delete-subscriber?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Delete subscriber fail!");
  }

  return data;
}

export async function sendEmailToSubscriber(
  subscriberId: string,
  promotionId: string,
  locale: Lang = "en",
) {
  const res = await fetch(
    `/api/subscriber/send-email-to-subscriber?subscriberId=${subscriberId}&promotionId=${promotionId}&locale=${locale}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Send email to subscriber fail!");
  }

  return data;
}

export async function sendEmailToAllSubscriber(
  promotionId: string,
  locale: Lang = "en",
) {
  const res = await fetch(
    `/api/subscriber/send-email-to-all-subscriber?promotionId=${promotionId}&locale=${locale}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Send email to all subscriber fail!");
  }

  return data;
}
