"use client";

import Header from "@/components/Header";
import { useGetProductsQuery } from "../state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", flex: 0.5, minWidth: 80 },
  { field: "name", headerName: "Product Name", flex: 2, minWidth: 150 },
  { field: "price", headerName: "Price", flex: 1, minWidth: 100, valueGetter: (_, row) => `$${row.price}` },
  { field: "rating", headerName: "Rating", flex: 1, minWidth: 100, valueGetter: (_, row) => (row.rating ? row.rating : "N/A") },
  { field: "stockQuantity", headerName: "Stock Quantity", flex: 1.5, minWidth: 120 },
];

const Inventory = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-4xl font-bold animate-pulse text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-900 p-4 min-h-screen items-center">
      <Header  name="Inventory" />

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            // Root
            backgroundColor: "#18181b",
            color: "#e4e4e7",
            border: "1px solid #27272a",

            // Virtual scroller
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#18181b",
            },

            // Rows
            "& .MuiDataGrid-row": {
              backgroundColor: "#18181b",
              color: "#e4e4e7",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#27272a",
            },

            // Cells
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #27272a",
              color: "#e4e4e7",
              fontSize:"1rem"
            },

            // Column headers
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#18181b !important",
              borderBottom: "1px solid #27272a !important",
            },

            "& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeader--sortable, .MuiDataGrid-withBorderColor": {
              backgroundColor: "#18181b !important",
              color: "#f4f4f5 !important",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#f4f4f5",
              fontWeight: 600,
              fontSize: "1.2rem",
            },

            "& .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIcon": {
              color: "#a1a1aa",
            },

            "& .MuiDataGrid-columnSeparator": {
              color: "#27272a",
            },

            // Checkbox
            "& .MuiCheckbox-root": {
              color: "#a1a1aa",
            },

            // Footer
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #27272a",
              backgroundColor: "#18181b",
              color: "#e4e4e7",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Inventory;
