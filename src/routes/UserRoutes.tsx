import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  UserLayout,
  UserDashboard,
  UserOrders,
  UserOrderDetail,
  UserDownloads,
  UserSettings,
} from "../pages/userdashboard";

export default function UserRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
        <Route element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:id" element={<UserOrderDetail />} />
          <Route path="downloads" element={<UserDownloads />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
