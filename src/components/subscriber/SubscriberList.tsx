"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import Pagination from "@mui/material/Pagination";
import Button from "@/components/ui/button/Button";
import PaginationItem from "@mui/material/PaginationItem";
import ActionsButton from "@/components/ui/button/ActionsButton";

import { formatDate } from "@/utils/dateFormat";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getAllPromotion } from "@/services/promotion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import {
  deleteSubscriber,
  getAllSubscribers,
  sendEmailToSubscriber,
  sendEmailToAllSubscriber,
} from "@/services/subscriber";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubscriberList = () => {
  const { user } = useUserInfo();
  const [subscriberData, setSubscriberData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPromotionId, setSelectedPromotionId] = useState("");
  const [dialogType, setDialogType] = useState<"single" | "all">("single");
  const [selectedSubscriberId, setSelectedSubscriberId] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { data, isLoading } = useSWR(
    "/api/subscriber/get-list",
    getAllSubscribers,
  );

  const { data: promotionData, isLoading: isPromotionLoading } = useSWR(
    "/api/promotion/get-list",
    getAllPromotion,
  );

  const handleSendEmailToAllSubscriber = () => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to send email for all subscriber.", {
        icon: "⚠️",
        position: "bottom-right",
      });
      return;
    }
    setDialogType("all");
    setSelectedSubscriberId("");
    setSelectedPromotionId("");
    setIsDialogOpen(true);
  };

  const handleSendEmailToSubscriber = (id: string) => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to to send email for subscriber.", {
        icon: "⚠️",
        position: "bottom-right",
      });
      return;
    }
    setDialogType("single");
    setSelectedSubscriberId(id);
    setSelectedPromotionId("");
    setIsDialogOpen(true);
  };

  const handleSendEmail = async () => {
    if (!selectedPromotionId) {
      toast.error("Please select a promotion", { position: "bottom-right" });
      return;
    }

    setIsSending(true);
    try {
      if (dialogType === "all") {
        await sendEmailToAllSubscriber(selectedPromotionId, "en");
        toast.success("Email sent to all subscribers successfully!", {
          position: "bottom-right",
        });
      } else {
        await sendEmailToSubscriber(
          selectedSubscriberId,
          selectedPromotionId,
          "en",
        );
        toast.success("Email sent to subscriber successfully!", {
          position: "bottom-right",
        });
      }

      setIsDialogOpen(false);
      setSelectedPromotionId("");
      setSelectedSubscriberId("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send email", {
        position: "bottom-right",
      });
      console.error("Send email error:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPromotionId("");
    setSelectedSubscriberId("");
    setIsSending(false);
  };

  const columns = [
    {
      name: "fullName",
      label: "FullName Subscriber",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => {
          const maxLength = 15;
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
      name: "email",
      label: "Email Address",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => {
          const maxLength = 15;
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
      name: "phone",
      label: "Phone Number",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string) => {
          const maxLength = 15;
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
      name: "createdAt",
      label: "Created Date",
      options: {
        filter: true,
        sort: true,
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
          const subscriber: any = subscriberData[tableMeta.rowIndex];
          const id = subscriber.id;

          const menuItems: any = {
            MenuItemOne: "Send Newsletters",
            handleClickMenuItemOne: () => {
              handleSendEmailToSubscriber(id);
            },
            MenuItemTwo: "Delete",
            handleClickMenuItemTwo: () => {
              handleDelete(id);
            },
          };

          return <ActionsButton {...menuItems} />;
        },
      },
    },
  ];

  useEffect(() => {
    if (data) {
      setSubscriberData(data);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to delete a subscriber.", {
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
        const dataRes = await deleteSubscriber(id);
        toast.success(dataRes.message, { position: "bottom-right" });
        setSubscriberData((prevData) =>
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
                title={
                  <Button
                    size="sm"
                    variant="primary"
                    type="submit"
                    onClick={handleSendEmailToAllSubscriber}
                  >
                    Send newsletters to all subscriber
                  </Button>
                }
                data={subscriberData}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          </div>

          {/* Promotion Selection Dialog */}
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {dialogType === "all"
                    ? "Send Newsletter to All Subscribers"
                    : "Send Newsletter to Subscriber"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {dialogType === "all"
                    ? "Select a promotion to send to all subscribers."
                    : "Select a promotion to send to the selected subscriber."}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="py-4">
                <label className="mb-2 block text-sm font-medium">
                  Select Promotion
                </label>
                {isPromotionLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2"></div>
                  </div>
                ) : (
                  <Select
                    value={selectedPromotionId}
                    onValueChange={setSelectedPromotionId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a promotion..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {promotionData?.map((promotion: any) => (
                        <SelectItem
                          key={promotion.id}
                          value={promotion.id.toString()}
                        >
                          {promotion.title ||
                            promotion.name ||
                            `Promotion ${promotion.id}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={handleCloseDialog}
                  disabled={isSending}
                  className="rounded-none bg-red-500 text-white"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSendEmail}
                  disabled={!selectedPromotionId || isSending}
                  className="rounded-none bg-green-700 text-white"
                >
                  Send Email
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};

export default SubscriberList;
