"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "@/components/common/Loader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useRouter } from "next/navigation";
import { getDetailOrder } from "@/services/order";
import { useOrderUpdate } from "@/hooks/useOrderUpdate";
import { STATUS_FLOW_STEPS, STATUS_OPTIONS } from "@/constants";
import {
  OrderStatus,
  StatusOption,
  MessageState,
  PropsUpdate,
  OrderDataUpdate,
} from "@/types/order";

// Helper functions
const getStatusInfo = (status: OrderStatus): StatusOption => {
  return (
    STATUS_OPTIONS.find((option) => option.value === status) ??
    STATUS_OPTIONS[0]
  );
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

const OrderHeader: React.FC<{ orderCode: string }> = ({ orderCode }) => (
  <div className="mb-6">
    <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Update order status
    </h2>
    <p className="text-sm text-gray-500">
      Order Code:{" "}
      <span className="font-medium text-gray-900 dark:text-white">
        #{orderCode}
      </span>
    </p>
  </div>
);

const StatusDisplay: React.FC<{
  label: string;
  status: OrderStatus;
  className?: string;
}> = ({ label, status, className = "mb-6" }) => (
  <div className={className}>
    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="flex items-center">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusInfo(status).color}`}
      >
        {getStatusInfo(status).label}
      </span>
    </div>
  </div>
);

const StatusSelector: React.FC<{
  selectedStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  disabled: boolean;
}> = ({ selectedStatus, onStatusChange, disabled }) => (
  <div className="mb-6">
    <label
      htmlFor="status-select"
      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Select new status
    </label>
    <div className="relative">
      <select
        id="status-select"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        disabled={disabled}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon />
    </div>
  </div>
);

const ChevronDownIcon: React.FC = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
    <svg
      className="stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400"
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const UpdateButton: React.FC<{
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}> = ({ onClick, isLoading, disabled }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          <span>Updating...</span>
        </>
      ) : (
        <>
          <UpdateIcon />
          <span>Update status</span>
        </>
      )}
    </button>
  </div>
);

const LoadingSpinner: React.FC = () => (
  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
);

const UpdateIcon: React.FC = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const MessageAlert: React.FC<{ message: MessageState }> = ({ message }) => (
  <div
    className={`mt-4 rounded-lg p-3 text-sm ${
      message.type === "success"
        ? "border border-green-200 bg-green-50 text-green-800"
        : "border border-red-200 bg-red-50 text-red-800"
    }`}
  >
    <div className="flex items-center gap-2">
      {message.type === "success" ? <SuccessIcon /> : <ErrorIcon />}
      <span>{message.text}</span>
    </div>
  </div>
);

const SuccessIcon: React.FC = () => (
  <svg
    className="h-4 w-4 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const ErrorIcon: React.FC = () => (
  <svg
    className="h-4 w-4 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const StatusFlowInfo: React.FC = () => (
  <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
    <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Order status workflow
    </h3>
    <div className="flex flex-wrap gap-2 text-xs">
      {STATUS_FLOW_STEPS.map((step, index) => (
        <React.Fragment key={step.label}>
          <span className={`rounded px-2 py-1 ${step.color}`}>
            {step.label}
          </span>
          {index < STATUS_FLOW_STEPS.length - 1 && (
            <span className="text-gray-400">→</span>
          )}
        </React.Fragment>
      ))}
    </div>
    <p className="mt-2 text-xs text-gray-500">
      * Orders can be canceled at any stage before delivery.
    </p>
  </div>
);

// Main Component
const UpdateOrderComponent: React.FC<PropsUpdate> = ({
  orderCode,
  currentStatus = "pending",
  onUpdateSuccess,
}) => {
  const router = useRouter();
  const {
    data,
    isLoading: isFetching,
    mutate,
  } = useSWR<OrderDataUpdate>(orderCode || null, getDetailOrder);

  const actualCurrentStatus = data?.status || currentStatus;
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(actualCurrentStatus);

  const { isLoading, message, updateOrderStatus } = useOrderUpdate(orderCode);

  useEffect(() => {
    setSelectedStatus(actualCurrentStatus);
  }, [actualCurrentStatus]);

  const handleUpdateStatus = () => {
    updateOrderStatus(
      selectedStatus,
      actualCurrentStatus,
      mutate,
      onUpdateSuccess,
    );
  };

  if (isFetching && !data) {
    return <Loader />;
  }

  const isUpdateDisabled = isLoading || selectedStatus === actualCurrentStatus;

  return (
    <div className="space-y-6">
      <BackButton onBack={() => router.back()} />

      <div className="rounded-[2px] border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <OrderHeader orderCode={orderCode} />

        <StatusDisplay
          label="Current status"
          status={actualCurrentStatus}
        />

        <StatusSelector
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          disabled={isLoading}
        />

        <StatusDisplay label="New status" status={selectedStatus} />

        <UpdateButton
          onClick={handleUpdateStatus}
          isLoading={isLoading}
          disabled={isUpdateDisabled}
        />

        {message && <MessageAlert message={message} />}

        <StatusFlowInfo />
      </div>
    </div>
  );
};

export default UpdateOrderComponent;
