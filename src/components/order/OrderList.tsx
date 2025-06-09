"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ActionsButton from "@/components/ui/button/ActionsButton";

import { useRouter } from "next/navigation";
import { formatUSD } from "@/utils/currency";
import { formatDate } from "@/utils/dateFormat";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getAllOrder, deleteOrder } from "@/services/order";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

const OrderList = () => {
  const router = useRouter();
  const { user } = useUserInfo();
  const [orderData, setOrderData] = useState([]);
  const { data, isLoading } = useSWR("/api/order/get-list", getAllOrder);

  const goToDetailOrder = (orderCode: string) => {
    router.push(`/detail-order/${orderCode}`);
  };

  const handleEdit = (orderCode: string) => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to edit a order.", {
        icon: "⚠️",
        position: "bottom-right",
      });
      return;
    }
    router.push(`/update-order/${orderCode}`);
  };

  const columns = [
    {
      name: "orderCode",
      label: "Code",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => {
          const maxLength = 4;
          if (!value) return "";
          return (
            <div className="max-w-[200px]" title={value}>
              <span className="block truncate">
                {value.length > maxLength
                  ? value.slice(0, maxLength) + "..."
                  : value}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "customerName",
      label: "Customer",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
      },
    },
    {
      name: "customerPhone",
      label: "Phone",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => {
          const maxLength = 4;
          if (!value) return "";
          return (
            <div className="max-w-[200px]" title={value}>
              <span className="block truncate">
                {value.length > maxLength
                  ? value.slice(0, maxLength) + "..."
                  : value}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "customerEmail",
      label: "Email",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => {
          const maxLength = 4;
          if (!value) return "";
          return (
            <div className="max-w-[200px]" title={value}>
              <span className="block truncate">
                {value.length > maxLength
                  ? value.slice(0, maxLength) + "..."
                  : value}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => {
          if (!value) return "";

          const getStatusStyle = (status: string) => {
            switch (status.toLowerCase()) {
              case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
              case "confirmed":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
              case "shipping":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
              case "delivered":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
              case "cancelled":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
              default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
            }
          };

          return (
            <div className="max-w-[200px]" title={value}>
              <span
                className={`inline-block px-2 py-0.5 text-xs font-medium ${getStatusStyle(value)}`}
              >
                {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "totalAmount",
      label: "Amount",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: number) => formatUSD(value),
      },
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => formatDate(value),
      },
    },
    {
      name: "updatedAt",
      label: "Updated At",
      options: {
        filter: false,
        sort: false,
        display: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => formatDate(value),
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (_: any, tableMeta: any) => {
          const order: any = orderData[tableMeta.rowIndex];
          const id = order.id;
          const orderCode = order.orderCode;

          const menuItems: any = {
            MenuItemOne: "View Detail",
            handleClickMenuItemOne: () => goToDetailOrder(orderCode),
            MenuItemTwo: "Edit",
            handleClickMenuItemTwo: () => handleEdit(orderCode),
            MenuItemThree: "Delete",
            handleClickMenuItemThree: () => handleDelete(id),
          };

          return <ActionsButton {...menuItems} />;
        },
      },
    },
  ];

  useEffect(() => {
    if (data) {
      setOrderData(data);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to delete a order.", {
        icon: "⚠️",
        position: "bottom-right",
      });
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      customClass: {
        container: "swal-high-zindex",
      },
      didOpen: () => {
        const swalContainer = document.querySelector(
          ".swal2-container",
        ) as HTMLElement;
        if (swalContainer) {
          swalContainer.style.zIndex = "999999";
        }
      },
    });

    if (result.isConfirmed) {
      try {
        const dataRes = await deleteOrder(id);
        toast.success(dataRes.message, { position: "bottom-right" });
        setOrderData((prevData) =>
          prevData.filter((item: any) => item.id !== id),
        );
      } catch (error: any) {
        toast.error(error.message, { position: "bottom-right" });
        console.error(error);
      }
    }
  };

  const options: MUIDataTableOptions = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 30],
    responsive: "standard",
    tableBodyMaxHeight: "70vh",
    customFooter: (
      count: number,
      page: number,
      rowsPerPage: number,
      changeRowsPerPage: (rowsPerPage: number) => void,
      changePage: (page: number) => void,
    ) => (
      <tfoot>
        <tr>
          <td colSpan={6} style={{ padding: "10px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                count={Math.ceil(count / rowsPerPage)}
                page={page + 1}
                onChange={(event, value) => changePage(value - 1)}
                color="primary"
                size="small"
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    sx={{
                      width: { xs: 28, sm: 36 },
                      height: { xs: 28, sm: 36 },
                      borderRadius: 2,
                      margin: "0 1px",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  />
                )}
              />
            </div>
          </td>
        </tr>
      </tfoot>
    ),
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "8px 12px",
              textAlign: "center",
              fontSize: "0.875rem",
              "@media (max-width: 768px)": {
                padding: "6px 2px",
                fontSize: "0.75rem",
              },
            },
            body: {
              padding: "8px 12px",
              textAlign: "center",
              fontSize: "0.875rem",
              "@media (max-width: 768px)": {
                padding: "6px 2px",
                fontSize: "0.75rem",
              },
            },
          },
        },
        MuiPopover: {
          styleOverrides: {
            paper: {
              padding: "8px",
            },
          },
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              marginLeft: "5px",
            },
          },
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto min-h-screen max-w-full">
          <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-full rounded-sm border bg-white">
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title="Order Management"
                data={orderData}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
