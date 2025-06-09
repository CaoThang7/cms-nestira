export async function getAllOrder() {
  const res = await fetch("/api/order/get-list");
  const dataOrder = await res.json();
  return dataOrder.orders;
}

export const getDetailOrder = async (orderCode: string) => {
  const res = await fetch(`/api/order/detail?orderCode=${orderCode}`);
  const dataOrder = await res.json();
  return dataOrder;
};

export async function updateOrder(payload: any, orderCode: string) {
  const res = await fetch(`/api/order/update?orderCode=${orderCode}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Update order fail!");
  }

  return data;
}

export async function deleteOrder(id: string) {
  const res = await fetch(`/api/order/delete?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Delete order fail!");
  }

  return data;
}
