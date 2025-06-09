export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productSnapshot: {
    name: { vi: string };
    productCode: string;
    brand: string;
    size: string;
    images: string[];
  };
}

export interface OrderData {
  orderCode: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  ward: string;
  district: string;
  city: string;
  notes?: string;
  items: OrderItem[];
  totalAmount: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface Props {
  orderCode: string;
}

export interface StatusStep {
  key: OrderStatus;
  label: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface OrderDataUpdate {
  status: OrderStatus;
  orderCode: string;
}

export interface StatusOption {
  value: OrderStatus;
  label: string;
  color: string;
}

export interface MessageState {
  type: "success" | "error";
  text: string;
}

export interface PropsUpdate {
  orderCode: string;
  currentStatus?: OrderStatus;
  onUpdateSuccess?: () => void;
}
