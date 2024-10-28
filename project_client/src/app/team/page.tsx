"use client";

import Header from "@/components/Header";
import { useAppSelector } from "@/components/redux";
import { dataGridClassNames, dataGridSxStyles } from "@/libs/utils";
import { useGetTeamsQuery, useGetUsersQuery } from "@/state/api";
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

const columns: GridColDef = [
   { field: "id", header: "ID", width: 100 },
   { field: "teamName", header: "Team Name", width: 150 },
   { field: "productOwnerUsername", header: "Product Owner", width: 200 },
   { field: "productManagerUsername", header: "Product Manager", width: 200 },
];

export default function TeamsPage() {
   const { data: teams, isLoading, error } = useGetTeamsQuery();
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

   if (isLoading) <div>Loding ...</div>;
   if (error) <div>Error</div>;

   return (
      <div className="px-6 flex w-full flex-col py-3">
         <Header isSmallText={false} name="Teams" />
         <div style={{ width: "100%" }}>
            <DataGrid
               slots={{
                  toolbar: CustomGridToolBar,
               }}
               rows={teams || []}
               columns={columns}
               className={dataGridClassNames}
               sx={dataGridSxStyles(isDarkMode)}
            />
         </div>
      </div>
   );
}
