"use client";

import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Loader from "@/components/common/Loader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { OrderItem, OrderData, OrderStatus, StatusStep, Props } from "@/types/order";
import { ORDER_STATUS_MAP, STATUS_COLORS } from "@/constants";
import { formatDateTime } from "@/utils/dateFormat";
import { getDetailOrder } from "@/services/order";
import { formatUSD } from "@/utils/currency";
import { useRouter } from "next/navigation";

// Helper functions
const getOrderStatusLabel = (status: OrderStatus): string => {
  return ORDER_STATUS_MAP[status] || status;
};

const getStatusSteps = (data: OrderData): StatusStep[] => {
  const baseSteps = [
    { key: 'pending' as OrderStatus, label: "Receiving orders" },
    { key: 'confirmed' as OrderStatus, label: "Order processing" },
    { key: 'shipping' as OrderStatus, label: "Being delivered" },
    { key: 'delivered' as OrderStatus, label: "Delivered" },
  ];

  const steps = baseSteps.map(step => ({
    ...step,
    time: getStepTime(step.key, data),
  }));

  if (data.status === 'cancelled') {
    return steps.map((step, index) => ({
      ...step,
      isCompleted: index === 0,
      isCurrent: false,
    }));
  }

  const currentStatusIndex = steps.findIndex(step => step.key === data.status);

  return steps.map((step, index) => ({
    ...step,
    isCompleted: index <= currentStatusIndex,
    isCurrent: index === currentStatusIndex,
  }));
};

const getStepTime = (stepKey: OrderStatus, data: OrderData): string => {
  const timeOnly = (dateString: string) => formatDateTime(dateString).split(" ")[1];
  
  switch (stepKey) {
    case 'pending':
      return timeOnly(data.createdAt);
    case 'confirmed':
      return data.status !== 'pending' ? timeOnly(data.updatedAt) : "Processing";
    case 'shipping':
      return ['shipping', 'delivered'].includes(data.status) ? timeOnly(data.updatedAt) : "Processing";
    case 'delivered':
      return data.status === 'delivered' ? timeOnly(data.updatedAt) : "Pending";
    default:
      return "Pending";
  }
};

const calculateSubtotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + Number(item.totalPrice), 0);
};

// Components
const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="flex items-center gap-2">
    <KeyboardBackspaceIcon
      className="h-6 w-6 cursor-pointer dark:text-white"
      onClick={onBack}
    />
    <p className="text-sm text-gray-800 dark:text-white/90">
      Back to order list
    </p>
  </div>
);

const OrderHeader: React.FC<{ data: OrderData }> = ({ data }) => (
  <div className="rounded-[2px] border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          Order #{data.orderCode}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Order time {formatDateTime(data.createdAt)}
        </p>
      </div>
      <div className="mt-4 sm:mt-0">
        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${STATUS_COLORS[data.status]}`}>
          {getOrderStatusLabel(data.status)}
        </span>
      </div>
    </div>
  </div>
);

const StatusTimeline: React.FC<{ steps: StatusStep[] }> = ({ steps }) => {
  const completedSteps = steps.filter(s => s.isCompleted).length;
  const progressWidth = completedSteps > 1 ? (completedSteps - 1) * 33.33 : 0;

  return (
    <div className="rounded-[2px] border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Order status
      </h2>
      
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Your items is on the way. Tracking information will be available within 24 hours.
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 h-px w-full bg-gray-200 dark:bg-gray-700" />
        <div
          className="absolute top-6 left-6 h-px bg-blue-500 transition-all duration-500"
          style={{ width: `${progressWidth}%` }}
        />

        {/* Status Steps */}
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.key} className="flex flex-col items-center">
              <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                step.isCompleted
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800"
              }`}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <div className={`text-sm font-medium ${
                  step.isCompleted ? "text-gray-900 dark:text-white" : "text-gray-500"
                }`}>
                  {step.label}
                </div>
                <div className="mt-1 text-xs text-gray-500">{step.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-[2px] border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
      {title}
    </h2>
    {children}
  </div>
);

const CustomerInfo: React.FC<{ data: OrderData }> = ({ data }) => (
  <InfoCard title="Customer information">
    <div className="space-y-3">
      <InfoField label="Customer name" value={data.customerName} />
      <InfoField label="Phone number" value={data.customerPhone} />
      <InfoField label="Email" value={data.customerEmail} />
    </div>
  </InfoCard>
);

const ShippingInfo: React.FC<{ data: OrderData }> = ({ data }) => (
  <InfoCard title="Shipping information">
    <div className="space-y-3">
      <InfoField 
        label="Address" 
        value={`${data.shippingAddress}, ${data.ward}, ${data.district}, ${data.city}`} 
      />
      {data.notes && <InfoField label="Note" value={data.notes} />}
    </div>
  </InfoCard>
);

const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p className="text-gray-900 dark:text-white">{value}</p>
  </div>
);

const OrderItems: React.FC<{ items: OrderItem[] }> = ({ items }) => (
  <InfoCard title="Ordered products">
    <div className="space-y-4">
      {items.map((item) => (
        <OrderItemCard key={item.id} item={item} />
      ))}
    </div>
  </InfoCard>
);

const OrderItemCard: React.FC<{ item: OrderItem }> = ({ item }) => (
  <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 sm:flex-row dark:border-gray-700">
    <div className="flex-shrink-0">
      <Image
        src={item.productSnapshot.images[0]}
        alt={item.productSnapshot.name.vi}
        width={96}
        height={96}
        className="rounded-lg object-cover"
      />
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-gray-900 dark:text-white">
        {item.productSnapshot.name.vi}
      </h3>
      <div className="mt-1 space-y-1 text-sm text-gray-500">
        <p>Product code: {item.productSnapshot.productCode}</p>
        <p>Brand: {item.productSnapshot.brand}</p>
        <p>Size: {item.productSnapshot.size}</p>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between">
      <div className="text-right">
        <p className="font-medium text-gray-900 dark:text-white">
          {formatUSD(item.unitPrice)}
        </p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
      <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
        {formatUSD(item.totalPrice)}
      </p>
    </div>
  </div>
);

const OrderSummary: React.FC<{ data: OrderData }> = ({ data }) => {
  const subtotal = calculateSubtotal(data.items);
  
  return (
    <InfoCard title="Order summary">
      <div className="space-y-2">
        <SummaryRow label="Temporary" value={formatUSD(subtotal)} />
        <SummaryRow label="Shipping fee" value="Free" />
        <hr className="my-2 dark:border-gray-700" />
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900 dark:text-white">Total</span>
          <span className="text-gray-900 dark:text-white">
            {formatUSD(data.totalAmount)}
          </span>
        </div>
      </div>
    </InfoCard>
  );
};

const SummaryRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-900 dark:text-white">{value}</span>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="rounded-[2px] border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-white/[0.03]">
    <p className="text-gray-500">No order found</p>
  </div>
);

// Main Component
const DetailOrderComponent: React.FC<Props> = ({ orderCode }) => {
  const router = useRouter();
  const { data, isLoading } = useSWR<OrderData>(
    orderCode || null,
    getDetailOrder
  );

  if (isLoading) return <Loader />;
  if (!data) return <EmptyState />;

  const statusSteps = getStatusSteps(data);

  return (
    <div className="space-y-6">
      <BackButton onBack={() => router.back()} />
      <OrderHeader data={data} />
      <StatusTimeline steps={statusSteps} />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <CustomerInfo data={data} />
        <ShippingInfo data={data} />
      </div>
      
      <OrderItems items={data.items} />
      <OrderSummary data={data} />
    </div>
  );
};

export default DetailOrderComponent;
