import * as React from "react";

import Navbar from "./navbar.tsx";
import SideBarMenu, { menuType } from "./sidebar.tsx";
import ChannelList from "../channel/list.tsx";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProgramList from "../program/list.tsx";
import Dashboard from "../dashboard/dashboard.tsx";
import PrivateRoute from "../../util/privateRoute.tsx";

const Workspace = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
        <div
          className='row'
          style={{
            marginTop: 60,
          }}
        >
          <div className='col-sm-12 col-md-3 col-lg-3'>
            <SideBarMenu
              onSelectMenuItem={(item: menuType) => {
                navigate(item.route, { state: { extraInfo: item?.title } });
              }}
            />
          </div>
          <div className='col-sm-12 col-md-9 col-lg-9 p-2'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route index path='/dashboard' element={<Dashboard />} />
              <Route path='/channellist' element={<ChannelList />} />
              <Route path='/programlist' element={<ProgramList />} />
            </Routes>
          </div>
        </div>
    </>
  );
};

export default Workspace;
