"use client";

import { useState } from "react";
import { updateOrder } from "@/services/order";
import { MessageState, OrderStatus } from "@/types/order";

export const useOrderUpdate = (orderCode: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);

  const updateOrderStatus = async (
    newStatus: OrderStatus,
    currentStatus: OrderStatus,
    mutate: () => Promise<any>,
    onSuccess?: () => void,
  ) => {
    if (newStatus === currentStatus) {
      setMessage({
        type: "error",
        text: "Please select a status different from the current one.",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      await updateOrder({ status: newStatus }, orderCode);
      await mutate();

      setMessage({
        type: "success",
        text: "Order status updated successfully!",
      });

      onSuccess?.();
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred while updating the order.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, message, updateOrderStatus };
};
