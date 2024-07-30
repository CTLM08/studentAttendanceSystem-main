import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentInfo from "./pages/StudentInfo";
import AbsencesStatistics from "./pages/AbsenceStatistics";
import ManageAbsences from "./pages/ManageAbsences";
import Login from "./pages/Login";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/manage-classes" element={<StudentInfo />} />
    <Route path="/attendance-statistics" element={<AbsencesStatistics />} />
    <Route path="/manage-absences" element={<ManageAbsences />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
