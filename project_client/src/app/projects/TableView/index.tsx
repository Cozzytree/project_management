import Header from "@/components/Header";
import { useAppSelector } from "@/components/redux";
import { dataGridClassNames, dataGridSxStyles } from "@/libs/utils";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type props = {
   id: string;
   setModelNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
   {
      field: "title",
      headerName: "Title",
      width: 100,
   },
   {
      field: "description",
      headerName: "Description",
      width: 200,
   },
   {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
         <span className="inline-flex rounded-full bg-green-300 px-2 text-green-900 font-bold text-sm">
            {params.value}
         </span>
      ),
   },
   {
      field: "priority",
      headerName: "Priority",
      width: 75,
   },
   {
      field: "tags",
      headerName: "Tags",
      width: 130,
   },
   {
      field: "startDate",
      headerName: "Start Date",
      width: 130,
   },
   {
      field: "dueDate",
      headerName: "Due Date",
      width: 130,
   },
   {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params: any) => params.value?.username || "Unknown",
   },
   {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (params: any) => params.value?.username || "unAssigned",
   },
];

export default function TableView({ id, setModelNewTaskOpen }: props) {
   const {
      data: taskList,
      isLoading,
      error,
   } = useGetTasksQuery({ projectId: Number(id) });
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>An error occured</div>;

   return (
      <div className="h-[450px] w-full px-4 xl:px-6">
         <div className="flex flex-wrap items-center justify-between gap-2 py-3">
            <Header
               name="Table View"
               isSmallText={false}
               buttonComponent={
                  <button
                     style={{ textShadow: "2px 2px 2px black" }}
                     className="p-2 rounded-md bg-blue-600 text-blue-200"
                     onClick={() => setModelNewTaskOpen(true)}
                  >
                     Add new Task
                  </button>
               }
            />
         </div>

         <DataGrid
            className={dataGridClassNames}
            rows={taskList || []}
            columns={columns}
            sx={dataGridSxStyles(isDarkMode)}
         />
      </div>
   );
}
