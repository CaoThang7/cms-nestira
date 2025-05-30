"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import Pagination from "@mui/material/Pagination";
import Button from "@/components/ui/button/Button";
import PaginationItem from "@mui/material/PaginationItem";
import ActionsButton from "@/components/ui/button/ActionsButton";

import { useRouter } from "next/navigation";
import { formatUSD } from "@/utils/currency";
import { formatDate } from "@/utils/dateFormat";
import { useUserInfo } from "@/hooks/useUserInfo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { deleteProduct, getAllProduct } from "@/services/product";

const ProductList = () => {
  const router = useRouter();
  const { user } = useUserInfo();
  const [productData, setProductData] = useState([]);
  const { data, isLoading } = useSWR("/api/product/get-list", getAllProduct);

  const goToCreateFormProduct = () => {
    router.push("/create-product");
  };

  const goToDetailProduct = (id: string) => {
    router.push(`/detail-product/${id}`);
  };

  const handleEdit = (id: string) => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to edit a product.", {
        icon: "⚠️",
        position: "bottom-right",
      });
      return;
    }
    router.push(`/update-product/?id=${id}`);
  };

  const columns = [
    {
      name: "productCode",
      label: "Code",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (_: any, tableMeta: any) => {
          const product: any = productData[tableMeta.rowIndex];
          const imageUrl = product?.images?.[0]?.url;
          return imageUrl ? (
            <Image
              src={imageUrl}
              alt="Product"
              width={100}
              height={100}
              className="mx-auto h-12 w-12 rounded object-cover"
            />
          ) : (
            "No Image"
          );
        },
      },
    },
    {
      name: "name",
      label: "Product Name",
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
      name: "category",
      label: "Category Name",
      options: {
        filter: false,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (_: any, tableMeta: any) => {
          const product: any = productData[tableMeta.rowIndex];
          const name = product.category?.name || "No Category";
          const maxLength = 15;
          return (
            <div className="max-w-[200px]" title={name}>
              <span className="block truncate">
                {name.length > maxLength
                  ? name.slice(0, maxLength) + "..."
                  : name}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "brand",
      label: "Brand",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({ style: { textAlign: "center" } }),
        setCellProps: () => ({ style: { textAlign: "center" } }),
        customBodyRender: (value: string | number) => formatUSD(value),
      },
    },
    {
      name: "createdAt",
      label: "Created Date",
      options: {
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
          const product: any = productData[tableMeta.rowIndex];
          const id = product.id;

          const menuItems: any = {
            MenuItemOne: "View Detail",
            handleClickMenuItemOne: () => {
              goToDetailProduct(id);
            },
            MenuItemTwo: "Edit",
            handleClickMenuItemTwo: () => {
              handleEdit(id);
            },
            MenuItemThree: "Delete",
            handleClickMenuItemThree: () => {
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
      setProductData(data);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    if (!user || user.role !== "admin") {
      toast("Only admins are allowed to delete a product.", {
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
        const dataRes = await deleteProduct(id);
        toast.success(dataRes.message, { position: "bottom-right" });
        setProductData((prevData) =>
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
                    onClick={goToCreateFormProduct}
                  >
                    Create Product
                  </Button>
                }
                data={productData}
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

export default ProductList;
