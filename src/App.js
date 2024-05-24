import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import Workspace from "./components/common/workspace.tsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CustomModal from "./components/common/modal.tsx";
import { useState, createContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/auth/login.tsx";
import Signup from "./components/auth/signup.tsx";
import Dashboard from "./components/dashboard/dashboard.tsx";
import ChannelList from "./components/channel/list.tsx";
import ProgramList from "./components/program/list.tsx";
import PrivateRoute from "./util/privateRoute.tsx";

export const ModalContext = createContext({
  openModal: false,
  setOpenModal: (value) => {},
  modalHeader: "",
  setModalHeader: (value) => {},
  modalChildren: null,
  setModalChildren: (children) => {},
  loginData: null,
  setLoginData: (value) => {},
  modalChildrenData: null,
  setModalChildrenData: (value) => {},
});

const queryClient = new QueryClient();

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalChildren, setModalChildren] = useState(null);
  const [modalChildrenData, setModalChildrenData] = useState(null);
  const [loginData, setLoginData] = useState(null);

  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModalContext.Provider
            value={{
              setOpenModal,
              setModalHeader,
              setModalChildren,
              setLoginData,
              loginData,
              modalChildrenData,
              setModalChildrenData,
            }}
          >
            <CustomModal
              open={openModal}
              headerTitle={modalHeader}
              children={modalChildren}
            />
            <Routes>
              <Route
                path='/login'
                element={
                  <PrivateRoute forAuthScreens={true}>
                    <Login />
                  </PrivateRoute>
                }
              />
              <Route
                path='/signup'
                element={
                  <PrivateRoute forAuthScreens={true}>
                    <Signup />
                  </PrivateRoute>
                }
              />
              <Route
                path='/'
                element={
                  <PrivateRoute>
                    <Workspace />
                  </PrivateRoute>
                }
              >
                <Route index path='/dashboard' element={<Dashboard />} />
                <Route path='/channellist' element={<ChannelList />} />
                <Route path='/programlist' element={<ProgramList />} />
              </Route>
            </Routes>
          </ModalContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
