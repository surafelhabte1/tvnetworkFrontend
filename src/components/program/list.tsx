import * as React from "react";
import DataTable from "../common/table.tsx";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App.js";
import ProgramForm from "./form.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Config } from "../../util/config.ts";

const ProgramList = () => {
  const {
    setOpenModal,
    setModalHeader,
    setModalChildren,
    setModalChildrenData,
  } = useContext(ModalContext);
  const [tableData, setTableData] = useState([]);

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["program"],
    queryFn: async () => {
      const response = await axios.post(`${Config.apiBaseUrl}get/program`, {
        orderBy: {},
        searchField: "title",
        searchTerm: "",
      });
      setTableData(response.data?.data);
      return response.data?.data;
    },
  });

  const onSearch = async (value: any) => {
    const response = await axios.post(`${Config.apiBaseUrl}search`, {
      model: "program",
      searchTerm: value,
      field: "title",
    });
    setTableData(response.data?.data);
  };

  const onSorting = async (field: any = "title", direction: string) => {
    const response = await axios.post(`${Config.apiBaseUrl}get/program`, {
      orderBy: {
        [field]: direction,
      },
      searchField: "title",
      searchTerm: "",
    });
    setTableData(response.data?.data);
  };

  const onFiltering = async (
    searchField: any = "title",
    searchTerm: string = ""
  ) => {
    const response = await axios.post(`${Config.apiBaseUrl}get/program`, {
      searchField,
      searchTerm,
    });
    setTableData(response.data?.data);
  };

  const column: any[] = [
    {
      accessorKey: "id",
      header: "Id",
      size: 10,
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 150,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      size: 75,
    },
  ];

  useEffect(() => {
    setModalHeader("Add Program");
    setModalChildren(() => {
      return (
        <ProgramForm
          onCancel={() => {
            setOpenModal(false);
            setModalChildrenData(null);
          }}
          onSuccess={() => {}}
          onError={() => {}}
        />
      );
    });
  }, []);

  return (
    isSuccess && (
      <DataTable
        column={column}
        data={tableData}
        model={"program"}
        onSearch={(value: any) => {
          onSearch(value);
        }}
        onSorting={(field: string, direction: string) => {
          onSorting(field, direction);
        }}
        onFiltering={(searchField: string, searchTerm: string) => {
          onFiltering(searchField, searchTerm);
        }}
      />
    )
  );
};

export default ProgramList;
