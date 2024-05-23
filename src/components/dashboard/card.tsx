import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Colors } from "../../util/colors.ts";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Config } from "../../util/config.ts";
import { useEffect, useState } from "react";

function DashboardCards() {
  const [
    { data: userData, isLoading: userLoading },
    { data: channelData, isLoading: channelLoading },
    { data: programData, isLoading: programLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["DashboardUser"],
        queryFn: async () => {
          const response = await axios.get(`${Config.apiBaseUrl}count/user`);
          return response.data?.data;
        },
      },
      {
        queryKey: ["DashboardChannel"],
        queryFn: async () => {
          const response = await axios.get(`${Config.apiBaseUrl}count/channel`);
          return response.data?.data;
        },
      },
      {
        queryKey: ["DashboardProgram"],
        queryFn: async () => {
          const response = await axios.get(`${Config.apiBaseUrl}count/program`);
          return response.data?.data;
        },
      },
    ],
  });

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-4 col-lg-4'>
        <IndividualCard
          headingTitle='System user'
          count={userData && userData?.currentCount}
          footerTitle={`+${userData && userData?.percentIncrease} % This month`}
          icon={
            <Icon
              icon='fluent:people-16-regular'
              width={24}
              height={24}
              style={{
                color: "white",
              }}
            />
          }
        />
      </div>
      <div className='col-sm-12 col-md-4 col-lg-4'>
        <IndividualCard
          headingTitle='Program'
          count={programData && programData?.currentCount}
          footerTitle={`+${
            programData && programData?.percentIncrease
          } % This month`}
          icon={
            <Icon
              icon='ri:mini-program-fill'
              width={24}
              height={24}
              style={{
                color: "white",
              }}
            />
          }
        />
      </div>
      <div className='col-sm-12 col-md-4 col-lg-4'>
        <IndividualCard
          headingTitle='Channel'
          count={channelData && channelData?.currentCount}
          footerTitle={`+${
            channelData && channelData?.percentIncrease
          } % This month`}
          icon={
            <Icon
              icon='fluent:channel-share-12-regular'
              width={24}
              height={24}
              style={{
                color: "white",
              }}
            />
          }
        />
      </div>
    </div>
  );
}

export interface individualCardProps {
  headingTitle: string;
  count: number;
  icon: any;
  footerTitle: string;
}

export function IndividualCard({
  headingTitle,
  count,
  icon,
  footerTitle,
}: individualCardProps) {
  return (
    <Card>
      <CardContent>
        <div className='row'>
          <div className='col-9'>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                color: Colors.black,
                mb: 1.5,
              }}
              gutterBottom
            >
              {headingTitle}
            </Typography>
          </div>
          <div className='col-3'>
            <div
              style={{
                backgroundColor: Colors.darkBlue,
                paddingLeft: 9,
                paddingTop: 3,
                borderRadius: 5,
                width: 45,
                height: 34,
              }}
            >
              {icon}
            </div>
          </div>
        </div>

        <Typography
          variant='h5'
          component='div'
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: Colors.black,
            mb: 1.5,
          }}
        >
          {count}
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: Colors.black,
          }}
          color='text.secondary'
        >
          {footerTitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCards;
