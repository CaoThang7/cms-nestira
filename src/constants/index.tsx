import { OrderStatus, StatusOption } from "@/types/order";

export const ORDER_STATUS_MAP: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipping: "Shipping",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  shipping: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  {
    value: "shipping",
    label: "Shipping",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
];

export const STATUS_FLOW_STEPS = [
  { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  { label: "Shipping", color: "bg-indigo-100 text-indigo-800" },
  { label: "Delivered", color: "bg-green-100 text-green-800" },
];
