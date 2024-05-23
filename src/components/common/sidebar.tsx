import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

import { Icon } from "@iconify/react";
import { Colors } from "../../util/colors.ts";
import { useNavigate } from "react-router-dom";

export interface menuType {
  title?: string;
  route?: string;
}

const SideBarMenu = ({
  onSelectMenuItem,
}: {
  onSelectMenuItem: (item: menuType) => void;
}) => {
  const getIcons = (index, color) => {
    const icons: any = [
      <Icon
        icon='material-symbols:dashboard'
        width={24}
        height={24}
        style={{
          marginRight: 10,
          color: color,
        }}
      />,
      <Icon
        icon='fluent:channel-share-12-filled'
        width={24}
        height={24}
        style={{
          marginRight: 10,
          color: color,
        }}
      />,
      <Icon
        icon='ri:mini-program-fill'
        width={24}
        height={24}
        style={{
          marginRight: 10,
          color: color,
        }}
      />,
    ];

    return icons[index];
  };

  const menus: menuType[] = [
    {
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      title: "Channel",
      route: "/channellist",
    },
    {
      title: "Program",
      route: "/programlist",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onClick = (index: number, route: menuType) => {
    setSelectedIndex(index);
    onSelectMenuItem(route);
  };

  return (
    <List
      sx={{
        minWidth: 320,
        bgcolor: "background.paper",
        height: "100vh",
        position: "fixed"
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      position='fixed'
    >
      {menus.map((item: menuType, index: number) => {
        return (
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => {
              onClick(index, item);
            }}
            key={index}
            sx={{
              color: selectedIndex === index ? Colors.white : Colors.black,

              backgroundColor:
                selectedIndex === index ? Colors.darkBlue : "transparent",
              "&.Mui-selected": {
                backgroundColor: Colors.darkBlue,
                "&:hover": {
                  backgroundColor: Colors.darkBlue,
                },
              },
              "&:hover": {
                backgroundColor:
                  selectedIndex === index
                    ? Colors.darkBlue
                    : "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <ListItemIcon>
              {getIcons(
                index,
                selectedIndex === index ? Colors.white : Colors.black
              )}
            </ListItemIcon>
            <ListItemText primary={item?.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default SideBarMenu;
