"use client";

import Header from "@/components/Header";
import {  useGetUsersQuery } from "../state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", flex: 0.5, minWidth: 80 },
  { field: "name", headerName: " Name", flex: 2, minWidth: 150 },
  { field: "email", headerName: " Email", flex: 2, minWidth: 150 },
  
  
  
]

const Users = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();

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
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
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

export default Users;
