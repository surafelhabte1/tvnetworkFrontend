import * as React from "react";
import DashboardCards from "./card.tsx";
import ProgramByCategoryChart from "./programByCategory.tsx";
import { Stack } from "@mui/material";
import ProgramByTypeChart from "./programByType.tsx";

const Dashboard = () => {
  return (
    <>
      <Stack spacing={2}>
        <DashboardCards />
        <ProgramByCategoryChart />
        <ProgramByTypeChart />
      </Stack>
    </>
  );
};

export default Dashboard;
