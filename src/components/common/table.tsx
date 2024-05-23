import { useContext, useEffect, useMemo, useState } from "react";
import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
import { Colors } from "../../util/colors.ts";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ModalContext } from "../../App.js";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Config } from "../../util/config.ts";

import { mkConfig, generateCsv, download } from "export-to-csv";
import TableCaption from "./TableCaption.tsx";

export const ActionMenu = ({ value, model }: { value: any; model: string }) => {
  const { setModalChildrenData, setOpenModal } = useContext(ModalContext);

  const queryClient = useQueryClient();

  const onEdit = () => {
    setModalChildrenData(value);
    setOpenModal(true);
  };

  const onDelete = (value: any) => {
    try {
      mutation.mutate(value?.id);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  type Props = {
    icon: any;
    onClick: (value: any) => void;
  };

  const menus: Props[] = [
    {
      icon: (
        <Icon
          icon='mdi:eye'
          width={24}
          height={24}
          style={{
            marginRight: 10,
          }}
        />
      ),
      onClick: () => {},
    },
    {
      icon: (
        <Icon
          icon='iconoir:edit-pencil'
          width={24}
          height={24}
          style={{
            marginRight: 10,
            cursor: "pointer",
          }}
        />
      ),
      onClick: () => {
        onEdit();
      },
    },
    {
      icon: (
        <Icon
          icon='mdi:trash'
          width={24}
          height={24}
          style={{
            marginRight: 10,
            color: Colors.red,
            cursor: "pointer",
          }}
        />
      ),
      onClick: () => {
        let result = window.confirm("are you sure want to delete this ?");
        if (result) {
          onDelete(value);
        }
      },
    },
  ];

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(
        `${Config.apiBaseUrl}delete/${model}/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });

  return (
    <Grid container spacing={0}>
      {menus.map((item: Props, index: number) => {
        return (
          <Grid item xs={3} sm={3} key={index}>
            <span onClick={() => item?.onClick()}>{item?.icon}</span>
          </Grid>
        );
      })}
    </Grid>
  );
};

export const StatusUpdater = ({ row, model }: { row: any; model: string }) => {
  const [status, setStatus] = useState(row.status);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (value) => {
      await axios.post(`${Config.apiBaseUrl}update/${model}/${row?.id}`, {
        status: value,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });

  const updateStatus = (value) => {
    try {
      mutation.mutate(value);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <FormControlLabel
      value='start'
      control={
        <Switch
          onChange={(event: any) => {
            setStatus(event.target.checked);
            updateStatus(event.target.checked);
          }}
          sx={{
            "& .MuiSwitch-switchBase": {
              "&.Mui-checked": {
                color: Colors.green,
                "& + .MuiSwitch-track": {
                  backgroundColor: Colors.green,
                },
              },
              "&:not(.Mui-checked)": {
                color: Colors.red,
                "& + .MuiSwitch-track": {
                  backgroundColor: Colors.red,
                },
              },
            },
          }}
          value={status}
          defaultChecked={status}
        />
      }
      label={
        <span
          style={{
            color: status ? Colors.green : Colors.red,
          }}
        >
          <Icon
            icon={
              status
                ? "material-symbols:check"
                : "material-symbols:info-outline"
            }
            width={20}
            height={20}
            style={{
              marginRight: 10,
              color: status ? Colors.green : Colors.red,
            }}
          />
          <small> {status ? "Active" : "Deactive"}</small>
        </span>
      }
      labelPlacement='start'
      style={{
        backgroundColor: status ? "#0080001A" : "#FF00001A",
        padding: 2,
        borderRadius: 5,
        opacity: 10,
        width: "80%",
        justifyContent: "center",
      }}
    />
  );
};

export interface dataTableProps {
  column: any[];
  data: any[];
  model: string;
  onSearch: (value: any) => void;
  onSorting: (field: string, direction: string) => void;
  onFiltering: (searchField: string, searchTerm: string) => void;
}

const DataTable = ({
  column,
  model,
  data,
  onSearch,
  onSorting,
  onFiltering,
}: dataTableProps) => {
  const extraCols = [
    {
      accessorKey: "status",
      header: "Status",
      size: 70,
      enableSorting: false,
      enableColumnFilter: false,
      style: {
        alignItems: "flex-start",
      },
      Cell: ({ row }) => (
        <Box component='span'>
          <StatusUpdater row={row.original} model={model} />
        </Box>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      size: 100,
      enableSorting: false,
      enableColumnFilter: false,
      style: {
        alignItems: "center",
      },
      Cell: ({ row }) => (
        <Box component='span'>
          <ActionMenu value={row.original} model={model} />
        </Box>
      ),
    },
  ];

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [...column, ...extraCols],
    []
  );

  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const exportTableData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const { setOpenModal } = useContext(ModalContext);

  const [enableFilter, setEnableFilter] = useState(false);

  useEffect(() => {
    onSorting(sorting[0]?.id, sorting[0]?.desc ? "desc" : "asc");
  }, [sorting]);

  useEffect(() => {
    onFiltering(columnFilters[0]?.id, columnFilters[0]?.value);
  }, [columnFilters]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilters: enableFilter,
    enablePagination: false,
    enableSorting: true,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnActions: false,
    enableGlobalFilter: false,
    enableFilters: true,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: (value: any) => {},
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        padding: 2,
        caption: {
          captionSide: "top",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderTopColor: "1px solid rgba(81, 81, 81, .5)",
        borderBottomColor: "1px solid rgba(81, 81, 81, .5)",
        fontWeight: "normal",
        color: "grey",
        alignSelf: "center",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "0px solid rgba(81, 81, 81, .5)",
        padding: 1,
      },
    },
    renderCaption: ({ table }) => {
      return (
        <TableCaption
          onAddClick={() => {
            setOpenModal(true);
          }}
          onExportClick={() => {
            exportTableData();
          }}
          onFilterClick={() => {
            setEnableFilter(!enableFilter);
          }}
          model={model}
          onSearch={(value: any) => {
            onSearch(value);
          }}
        />
      );
    },
  });

  return (
    <>
      <MaterialReactTable table={table}  />
    </>
  );
};

export default DataTable;
