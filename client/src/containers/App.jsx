// https://dribbble.com/shots/22394608-Sports-Betting-Casino-Interface
// dribble homepage inspo link

import React, { Suspense, useEffect } from "react";
import { Routes, Route, Sus } from "react-router-dom";
import { Layout, AdminLayout, AuthLayout } from "../layouts";
import {
  Home,
  UserProfile,
  AdminHome,
  Authentication,
  AdminUsers,
  AdminApps,
  Detail,
} from "../pages";
import { auth } from "../config/fibase.config";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div>
            <HashLoader color="#FF9E01" size={60} />
          </div>
        }
      >
        <Routes>
          {/* client user */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:appid" element={<Detail />} />
            <Route path="/profile/:uid" element={<UserProfile />} />
          </Route>
          {/* admin layouts */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="apps" element={<AdminApps />} />
            <Route path="users" element={<AdminUsers />} />
            {/* index help you make sure that is representing the default route under the admin*/}
          </Route>
          {/* auth layout */}
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route index element={<Authentication />} />
          </Route>
        </Routes>
      </Suspense>
      {/* dev tools to handle the state library */}
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-right" theme="dark" />
    </QueryClientProvider>
  );
};

export default App;
