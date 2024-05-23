import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Colors } from "../../util/colors.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Config } from "../../util/config.ts";

const ProgramByTypeChart = () => {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["programByTypeChart"],
    queryFn: async () => {
      const response = await axios.get(`${Config.apiBaseUrl}programBy/type`);
      return response.data?.data;
    },
  });

  return (
    <ResponsiveContainer
      width='100%'
      height={300}
      style={{
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <p
        style={{
          backgroundColor: Colors.black,
          color: Colors.white,
          padding: 10,
          paddingRight: 15,
          paddingLeft: 15,
          width: "fit-content",
          borderRadius: 7,
        }}
      >
        Program on Type
      </p>

      {isSuccess && (
        <LineChart
          data={data}
          style={{
            height: "80%",
          }}
        >
          <CartesianGrid strokeDasharray='3' />
          <XAxis dataKey='name' />
          <YAxis dataKey='_count.program' />
          <Line type='monotone' dataKey='_count.program' stroke='#8884d8' />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default ProgramByTypeChart;
