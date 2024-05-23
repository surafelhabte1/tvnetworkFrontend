import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  PieChart,
  Pie,
  Cell,
  Label,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Config } from "../../util/config.ts";
import { CardHeader } from "@mui/material";
import { Colors } from "../../util/colors.ts";

const ProgramByCategoryChart = () => {
  const COLORS = ["#8D1FB4", "#008000", "#1484E6", "#16C138", "#E10070"];

  const renderLabel = ({ viewBox }) => {
    const { cx, cy } = viewBox;
    return (
      <text
        x={cx}
        y={cy}
        fill='#181A41'
        textAnchor='middle'
        dominantBaseline='central'
        fontWeight={700}
      >
        Department
      </text>
    );
  };

  // const CustomLegend = () => (
  //   <div>
  //     {data.map((entry, index) => (
  //       <p
  //         key={`legend-${index}`}
  //         style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
  //       >
  //         <span
  //           style={{
  //             width: "10px",
  //             height: "10px",
  //             backgroundColor: COLORS[index],
  //             marginRight: "10px",
  //             borderRadius: "50%",
  //           }}
  //         ></span>

  //         <span
  //           style={{
  //             color: "#181A41",
  //             fontWeight: 600,
  //             opacity: 10,
  //           }}
  //         >
  //           {entry.name}
  //         </span>
  //         <span
  //           style={{
  //             color: "#00000080",
  //             fontWeight: 400,
  //             opacity: 10,
  //             marginLeft: 50,
  //             float: "right",
  //           }}
  //         >
  //           {entry._count.program}
  //         </span>
  //       </p>
  //     ))}
  //   </div>
  // );

  const CustomLegend = () => (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {data.map((entry, index) => (
          <tr key={`legend-${index}`}>
            <td style={{ padding: "5px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: COLORS[index],
                  display: "inline-block",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              ></span>
            </td>
            <td style={{ padding: "5px", color: "#181A41", fontWeight: 600 }}>
              {entry.name}
            </td>
            <td
              style={{
                padding: "5px",
                color: "#00000080",
                fontWeight: 400,
                textAlign: "right",
              }}
            >
              {entry._count.program}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["programByCategoryChart"],
    queryFn: async () => {
      const response = await axios.get(
        `${Config.apiBaseUrl}programBy/categorie`
      );
      return response.data?.data;
    },
    refetchInterval: 30000,
  });

  return (
    <>
      <ResponsiveContainer
        width='100%'
        height={400}
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
          Program on Category
        </p>
        <div style={{ marginTop: "-50px" }}>
          {isSuccess && (
            <PieChart width={800} height={400}>
              <Pie
                data={data}
                cx={120}
                cy={200}
                innerRadius={80}
                outerRadius={110}
                fill='#8884d8'
                paddingAngle={2}
                dataKey='_count.program'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label content={renderLabel} position='center' />
              </Pie>
              <Legend
                layout='vertical'
                verticalAlign='middle'
                content={<CustomLegend />}
              />
            </PieChart>
          )}
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default ProgramByCategoryChart;
