"use client";

import Header from "@/components/Header";
import { useAppSelector } from "@/components/redux";
import { dataGridClassNames, dataGridSxStyles } from "@/libs/utils";
import { useGetUsersQuery } from "@/state/api";
import {
   DataGrid,
   GridColDef,
   GridToolbarContainer,
   GridToolbarExport,
   GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";

const CustomGridToolBar = () => {
   return (
      <GridToolbarContainer>
         <GridToolbarFilterButton />
         <GridToolbarExport />
      </GridToolbarContainer>
   );
};

const columns: GridColDef[] = [
   { field: "userId", headerName: "ID", width: 100 },
   { field: "username", headerName: "Username", width: 150 },
   {
      field: "profilePictureUrl",
      headerName: "Profile Picrore",
      width: 100,
      renderCell: (params) => {
         return (
            <div className="flex w-full h-full items-center justify-center">
               <div className="wh-9 w-9">
                  <Image
                     src={"/logo.png"}
                     width={100}
                     height={50}
                     alt={params.row.username}
                     className="rounded-full h-full object-cover"
                  />
               </div>
            </div>
         );
      },
   },
];

export default function UserPage() {
   const { data: users, isLoading, error } = useGetUsersQuery();
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

   if (isLoading) <div>Loding ...</div>;
   if (error) <div>Error</div>;

   return (
      <div className="px-6 flex w-full flex-col py-3">
         <Header isSmallText={false} name="Users" />
         <div style={{ height: 650, width: "100%" }}>
            <DataGrid
               slots={{
                  toolbar: CustomGridToolBar,
               }}
               rows={users || []}
               columns={columns}
               getRowId={(row) => row.userId}
               className={dataGridClassNames}
               sx={dataGridSxStyles(isDarkMode)}
            />
         </div>
      </div>
   );
}
