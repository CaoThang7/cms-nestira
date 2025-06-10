"use client";
import useSWR from "swr";
import React from "react";
import Loader from "@/components/common/Loader";

import { getYearlyStats } from "@/services/statistical";
import { useTheme } from "@/context/ThemeContext";
import { formatUSD } from "@/utils/currency";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  ShoppingCart,
  CheckCircle,
  Cancel,
  AttachMoney,
  LocalShipping,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const YearSalesChart = () => {
  const { theme } = useTheme();

  const { data, isLoading } = useSWR(
    "/api/statistical/get-yearly-stats",
    getYearlyStats,
  );

  // Data for pie chart
  const pieData = [
    { name: "Delivered", value: data?.deliveredOrders, color: "#4caf50" },
    { name: "Cancelled", value: data?.cancelledOrders, color: "#f44336" },
    {
      name: "Processing",
      value: data?.totalOrders - data?.deliveredOrders - data?.cancelledOrders,
      color: "#ff9800",
    },
  ];

  // Data for column chart
  const barData = [
    {
      name: "Order Statistics",
      "Total Orders": data?.totalOrders,
      Delivered: data?.deliveredOrders,
      Cancelled: data?.cancelledOrders,
    },
  ];

  const statsCards = [
    {
      title: "Total Orders",
      value: data?.totalOrders,
      icon: <ShoppingCart />,
      color: "#2196f3",
      bgColor: "#e3f2fd",
    },
    {
      title: "Delivered Orders",
      value: data?.deliveredOrders,
      icon: <CheckCircle />,
      color: "#4caf50",
      bgColor: "#e8f5e8",
    },
    {
      title: "Cancelled Orders",
      value: data?.cancelledOrders,
      icon: <Cancel />,
      color: "#f44336",
      bgColor: "#ffebee",
    },
    {
      title: "Total Income",
      value: formatUSD(data?.totalIncome),
      icon: <AttachMoney />,
      color: "#ff9800",
      bgColor: "#fff3e0",
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Statistics for the year{data?.year}
        </Typography>
        <Typography
          variant="subtitle1"
          color={theme === "dark" ? "#98a2b3" : "#667085"}
        >
          Overview of business activities during the year
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat: any, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${stat?.bgColor} 0%, white 100%)`,
                boxShadow:
                  theme === "dark"
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.1)",
                borderRadius: "2px",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    theme === "dark"
                      ? "0 8px 30px rgba(0,0,0,0.4)"
                      : "0 8px 30px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold", color: stat.color }}
                    >
                      {typeof stat?.value === "string"
                        ? stat?.value
                        : stat?.value.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {stat?.title}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat?.color, width: 36, height: 36 }}>
                    {stat?.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delivery Rate Progress */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: theme === "dark" ? "#0E0E0E" : "white",
          borderRadius: "2px",
          border: theme === "dark" ? "1px solid #1d2939" : "1px solid #e4e7ec",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocalShipping sx={{ mr: 1, color: "#1976d2" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: theme === "dark" ? "white" : "#101828",
              }}
            >
              Successful delivery rate
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={data?.deliveryRate}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    bgcolor:
                      data?.deliveryRate >= 80
                        ? "#4caf50"
                        : data?.deliveryRate >= 50
                          ? "#ff9800"
                          : "#f44336",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
            <Box>
              <Chip
                label={`${data?.deliveryRate}%`}
                color={
                  data?.deliveryRate >= 80
                    ? "success"
                    : data?.deliveryRate >= 50
                      ? "warning"
                      : "error"
                }
                sx={{ fontWeight: "bold" }}
              />
            </Box>
          </Box>

          <Typography
            variant="body2"
            color={theme === "dark" ? "#98a2b3" : "#667085"}
          >
            {data?.deliveredOrders} above {data?.totalOrders} the order has been
            delivered successfully.
          </Typography>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: 400,
              backgroundColor: theme === "dark" ? "#0E0E0E" : "white",
              borderRadius: "2px",
              border:
                theme === "dark" ? "1px solid #1d2939" : "1px solid #e4e7ec",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: theme === "dark" ? "white" : "#1d2939",
                }}
              >
                Order status distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: 400,
              backgroundColor: theme === "dark" ? "#0E0E0E" : "white",
              borderRadius: "2px",
              border:
                theme === "dark" ? "1px solid #1d2939" : "1px solid #e4e7ec",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: theme === "dark" ? "white" : "#1d2939",
                }}
              >
                Order comparison chart
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme === "dark" ? "#424242" : "#e0e0e0"}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={theme === "dark" ? "#fff" : "#000"}
                  />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Total Orders"
                    fill="#2196f3"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="Delivered"
                    fill="#4caf50"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="Cancelled"
                    fill="#f44336"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default YearSalesChart;
