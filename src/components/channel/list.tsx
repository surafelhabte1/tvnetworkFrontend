import * as React from "react";
import DataTable from "../common/table.tsx";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App.js";
import ChannelForm from "./form.tsx";

import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "axios";
import { Config } from "../../util/config.ts";

const ChannelList = () => {
  const {
    setOpenModal,
    setModalHeader,
    setModalChildren,
    setModalChildrenData,
  } = useContext(ModalContext);

  const [tableData, setTableData] = useState([]);

  const column: any[] = [
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
  ];

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["channel"],
    queryFn: async () => {
      const response = await axios.post(`${Config.apiBaseUrl}get/channel`, {
        orderBy: {},
        searchField: "name",
        searchTerm: "",
      });
      setTableData(response.data?.data);
      return response.data?.data;
    },
  });

  const onSearch = async (value: any) => {
    const response = await axios.post(`${Config.apiBaseUrl}search`, {
      model: "channel",
      searchTerm: value,
      field: "name",
    });
    setTableData(response.data?.data);
  };

  const onSorting = async (field: any = "name", direction: string) => {
    const response = await axios.post(`${Config.apiBaseUrl}get/channel`, {
      orderBy: {
        [field]: direction,
      },
      searchField: "name",
      searchTerm: "",
    });
    setTableData(response.data?.data);
  };

  const onFiltering = async (
    searchField: any = "name",
    searchTerm: string = ""
  ) => {
    const response = await axios.post(`${Config.apiBaseUrl}get/channel`, {
      searchField,
      searchTerm,
    });
    setTableData(response.data?.data);
  };

  useEffect(() => {
    setModalHeader("Add Channel");
    setModalChildren(() => {
      return (
        <ChannelForm
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
    <DataTable
      column={column}
      data={tableData}
      model={"channel"}
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
  );
};

export default ChannelList;
